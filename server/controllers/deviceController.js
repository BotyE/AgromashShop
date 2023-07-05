const ApiError = require('../middleware/ApiError');
const uuid = require('uuid')
const path = require('path');
const fs = require('fs')
const {Device, DeviceInfo, Follow, FollowDevice} = require('../models/models');


class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, categoryId, old_price, count, article, info,description} = req.body
            const {img} = req.files
            if (!name || !price || !categoryId || !old_price || !count || !article) {
                return next(ApiError.badRequest('Недосточно данных'))
            }
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, categoryId, count, article, img: fileName, old_price,description});
            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async changeOne(req, res, next) {
        try {
            let {id, name, price, categoryId, old_price, count, article, info,description} = req.body
            if(req.files) {
                const {img} = req.files
                let fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
                const device = await Device.findByPk(id)
                device.name = name;
                device.price = price;
                device.categoryId = categoryId;
                device.count=count;
                device.article=article;
                if(device.img != 'avatar.png') {
                    const deleteFile = path.join(__dirname, '..' , 'static', device.img)
                    if (fs.existsSync(deleteFile)) {
                        fs.unlink(deleteFile, (err) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log('deleted');
                        })
                    }
                }
                device.img = fileName;
                device.old_price = old_price;
                device.description = description 
                device.save()
                
                if (info) {
                    info = JSON.parse(info)
                    await DeviceInfo.destroy({ where: {deviceId: id} })
                    info.forEach(i =>
                        DeviceInfo.create({
                            title: i.title,
                            description: i.description,
                            deviceId: id
                        })
                    )
                }
                return res.json(device)
            }
            else {
                const device = await Device.findByPk(id)
                device.name = name;
                device.price = price;
                device.categoryId = categoryId;
                device.count=count;
                device.article=article;
                device.old_price = old_price;
                device.description = description 
                device.save()
                if (info) {
                    info = JSON.parse(info)
                    const deviceInfo = await DeviceInfo.destroy({ where: {deviceId: id} })
                    info.forEach(i =>
                        DeviceInfo.create({
                            title: i.title,
                            description: i.description,
                            deviceId: id
                        })
                    )
                }
                return res.json(device)
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res, next) {
        try {
            let {categoryId, limit, page} = req.query
            page = page || 1
            limit = 12
            let offset = page * limit - limit
            let devices;
            if (!isNaN(categoryId)) 
                devices = await Device.findAndCountAll({
                    limit, 
                    offset,
                    include: [{model: DeviceInfo, as: 'info'}],
                    order: [
                        ['id', 'ASC']
                    ],
                })

            if (categoryId)
                devices = await Device.findAndCountAll({
                    where:{categoryId: categoryId}, 
                    limit, 
                    offset,
                    include: [{model: DeviceInfo, as: 'info'}],
                    order: [
                        ['id', 'ASC']
                    ],
                })
            return res.json(devices)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const device = await Device.findOne(
                {
                    where: {id},
                    include: [{model: DeviceInfo, as: 'info'}]
                },
            )
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async deleteOne(req, res, next) {
        try {
            const {id} = req.params
            const device = await Device.findByPk(id)
            if(device.img != 'avatar.png')
                {
                    const deleteFile = path.join(__dirname, '..' , 'static', device.img)
                    if (fs.existsSync(deleteFile)) {
                        fs.unlink(deleteFile, (err) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log('deleted');
                        })
                    }
                }
            device.destroy()
            const device_info = await DeviceInfo.destroy(
                {
                    where: {deviceId: id}
                },
            )
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getFollow(req, res, next) {
        try {
            const {id} = req.params
            var Sequelize = require('sequelize');
            var Op = Sequelize.Op;
            const follows = await Follow.findOne({
                where: {userId: id}
            })
            const followDevice = await FollowDevice.findAll({
                where: {followId: follows.id}
            })
            let maps = followDevice.map(elem => {
                return elem.deviceId
            })

            const devices = await Device.findAll({
                where: {
                id: {
                    [Op.in]: maps
                }
                }
            })

            return res.json(devices)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new DeviceController()