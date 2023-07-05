const {Device} = require('../models/models')
const ApiError = require('../middleware/ApiError')

class FilterController {
    async getSearch(req, res, next) {
      try {
        const { Op } = require('sequelize')
        const Sequelize = require('sequelize')
        let {text,page} = req.query
        page = page || 1
        const limit = 12
        let offset = page * limit - limit
        const filters = await Device.findAndCountAll({where: {
            [Op.or]: [
              Sequelize.fn('lower', Sequelize.col('name')),
              {
                  $like: `%${text}%`
              },
              Sequelize.fn('lower', Sequelize.col('article')),
              {
                  $like: `%${text}%`
                }
            ]
          }, limit, offset,
          order: [
            ['id', 'ASC'],
        ],})
        return res.json(filters)
      } catch (e) {
        next(ApiError.badRequest(e.message))
      }
    }

}

module.exports = new FilterController()