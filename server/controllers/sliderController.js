const {Slider} = require('../models/models')
const ApiError = require('../middleware/ApiError')
const uuid = require('uuid')
const path = require('path');
const fs = require('fs')

class SliderController {
    async create(req, res, next) {
        try {
            const {name,link,order} = req.body
            const {img} = req.files
                let fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const slider = await Slider.create({name,link,img: fileName, order})
            return res.json(slider)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const sliders = await Slider.findAll({order: [
                ['order', 'ASC'],
            ]})
            return res.json(sliders)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteOne(req, res, next) {
        try {
            const {id} = req.params
            const slide = await Slider.findByPk(id)
            const deleteFile = path.join(__dirname, '..' , 'static', slide.img)
                    if (fs.existsSync(deleteFile)) {
                        fs.unlink(deleteFile, (err) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log('deleted');
                        })
                    }
            const sliders = await Slider.destroy({
                where: {id}
            })
            return res.json(sliders)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new SliderController()