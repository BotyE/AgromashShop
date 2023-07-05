const {CategoryShop, Device, Category} = require('../models/models')
const ApiError = require('../middleware/ApiError')

class ShopController {
    async create(req, res, next) {
        try {
            const {id,order} = req.body
            const shop = await CategoryShop.create({categoryId: id, order})
            return res.json(shop)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const shop = await CategoryShop.findAll()
        
            const shops = await Promise.all(shop.map( async elem => {
                await Device.findAndCountAll({where: {categoryId: elem.categoryId}, limit:4, offset:0}).then( data => elem.dataValues['product'] = data.rows)
                await Category.findByPk(elem.categoryId).then( data => {
                    elem.dataValues['name'] = data.name
                    elem.dataValues['link'] = data.link
                })
                return elem
            }))

            return res.json(shops)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteOne(req, res) {
        try {
            const {id} = req.params
            const shop = await CategoryShop.destroy({
                where: {id}
            })
            return res.json(shop)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new ShopController()