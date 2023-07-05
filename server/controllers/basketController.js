const {Basket, BasketDevice, Device} = require('../models/models')
const ApiError = require('../middleware/ApiError')

class BasketController {

    async getAll(req, res, next) {
        try {
            var Sequelize = require('sequelize');
            var Op = Sequelize.Op;
            let {id} = req.params
            const basket = await Basket.findOne({
                where: {userId: id}
            })
            const baskets = await BasketDevice.findAll({
                    where: { basketId: basket.id }
            })
            let maps = baskets.map(elem => {
                return elem.deviceId
            })
            const devices = await Device.findAll({
                where: {
                id: {
                    [Op.in]: maps
                }
                }
            })

            const basketDevice = devices.map(device => {
                let newDevice = device;
                newDevice.dataValues['basket_count'] = baskets.find(x => x.deviceId === device.id).count 
                return newDevice
            })
            return res.json(basketDevice)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async addItem(req, res) {
        try {
            let {userId,count} =req.body.params;
            let {id} = req.params
            // const findedBasket = await BasketDevice.find()
            
            const basket = await Basket.findOne({
                where: {userId: userId}
            })
            const device = await Device.findByPk(id)
            if(device.count===0) {
                const baskets = await BasketDevice.destroy({
                    where: {
                        basketId: basket.id,
                        deviceId: id
                    }
                })
                return res.json(baskets)
            }
            await BasketDevice.findOne({
                where: {
                    deviceId: id,
                    basketId: basket.id
                }
            }).then( async basketElem =>{
                if(!basketElem) {
                    let addCount = (device.count>=count) ? count : device.count
                    const newBasketDevice = await BasketDevice.create({
                        deviceId: id,
                        basketId: basket.id,
                        count: addCount
                    })
                    return res.json(newBasketDevice)
                }
                else {
                    let addCount = (device.count>=count+basketElem.count) ? count+basketElem.count : device.count
                    const newBasketDevice = await BasketDevice.update({
                        count: addCount
                        },
                        {
                        where: {
                            deviceId: id,
                            basketId: basket.id,
                        }},
                    )
                    return res.json(newBasketDevice)
                }
            })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateCount(req, res, next) {
        try {
            let {basketId, deviceId,count} =req.body;
            let {id} = req.params
            const baskets = await BasketDevice.update({
                count: count,
                deviceId: deviceId,
                basketId: basketId
            },
            {
                where: {id}
            },)
            return res.json(baskets)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async clear(req, res, next) {
        try {
            const baskets = await BasketDevice.destroy({
                where: {basketId: basketId}
            },)
            return res.json(baskets)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteItem(req, res, next) {
        try {
            let {userId} = req.query
            let {id} = req.params
            const basket = await Basket.findOne({
                where: {userId: userId}
            })
            const baskets = await BasketDevice.destroy({
                where: {
                    basketId: basket.id,
                    deviceId: id
                }
            })
            return res.json(baskets)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async addStorageBasket(req, res, next) {
        try {
            const {userId, basket} = req.body.params
            const productStorage = JSON.parse(basket)
            if(!productStorage) return res.json("0")
            const baskets = await Basket.findOne({
                where: {userId: userId}
            })
            let products = await productStorage.map( async (product) => {
                const device = await Device.findByPk(product.id)
                const basketDevice = await BasketDevice.findOne({
                    where: {
                        deviceId: device.id,
                        basketId: baskets.id
                    }
                }).then( async basketElem =>{
                    if(!basketElem) {
                        let addCount = (device.count>=product.basket_count) ? product.basket_count : device.count
                        const newBasketDevice = await BasketDevice.create({
                            deviceId: device.id,
                            basketId: baskets.id,
                            count: addCount
                        })
                    //return res.json(newBasketDevice)
                    }
                    else {
                        let addCount = (device.count>=product.basket_count+basketElem.count) ? product.basket_count+basketElem.count : device.count
                        const newBasketDevice = await BasketDevice.update({
                            count: addCount
                            },
                            {
                            where: {
                                deviceId: device.id,
                                basketId: baskets.id,
                            }},
                        )
                    // return res.json(newBasketDevice)
                    }
                    
                })
            })
            return res.json(products)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}



module.exports = new BasketController()

// create , findAll, findOne, delete, changeOne,