const {Comment, User, Device} = require('../models/models')
const ApiError = require('../middleware/ApiError')

class CommentController {
    async addComment(req, res, next) {
      try {
        const {text,userId,rating,deviceId} = req.body
        const comment = await Comment.create({text,userId,rating,deviceId})
        return res.json(comment)
      } catch (e) {
        next(ApiError.badRequest(e.message))
      }
    }
    async agreeComment(req, res, next) {
        try {
          const {agreed} = req.body.params
          const {id} = req.params
          const comment = await Comment.findByPk(id)
          comment.agreed = !agreed
          await comment.save()
          if(!agreed) {
            const device = await Device.findByPk(comment.deviceId)
            const allcomments = await Comment.findAll({where: {deviceId:comment.deviceId, agreed: true}})
            device.rating = (device.rating*(allcomments.length-1) + comment.rating)/(allcomments.length)
            device.save()
          }
          else {
            const device = await Device.findByPk(comment.deviceId)
            const allcomments = await Comment.findAll({where: {deviceId:comment.deviceId, agreed: true}})
            device.rating = allcomments.length!==0 ? (device.rating*(allcomments.length+1) - comment.rating)/(allcomments.length) : 0
            device.save()
          }
          const comments = await Comment.findAll()
          return res.json(comments)
        } catch (e) {
          next(ApiError.badRequest(e.message))
        }
    }
    async getComments(req, res, next) {
      try {
        let {id} = req.params
        var Sequelize = require('sequelize');
        var Op = Sequelize.Op;
        const comments = await Comment.findAll({
            where: {
                deviceId: id
            }
        })
        let maps = comments.map(elem => {
            return elem.userId
        })
        const users = await User.findAll({
            where: {
              id: {
                [Op.in]: maps
              }
            }
          })
          
        let newMaps = comments.map( (elem) => {
            let findUser = users.find(x => x.id === elem.userId)
            let userName =findUser.second_name + " " + findUser.first_name + " " + findUser.middle_name
            elem.dataValues['user_name'] = userName
            return elem
        })
        return res.json(newMaps)
      } catch (e) {
        next(ApiError.badRequest(e.message))
      }
    }

    async deleteComment(req, res, next) {
      try {
        let {id} = req.params
        await Comment.destroy({where: { id}})
        return res.json()
      } catch (e) {
        next(ApiError.badRequest(e.message))
      }
    }

    async getAllComments(req, res, next) {
      try {
        var Sequelize = require('sequelize');
        var Op = Sequelize.Op;
        const comments = await Comment.findAll()
        let mapsUser = comments.map(elem => {
            return elem.userId
        })
        let mapsDevice = comments.map(elem => {
            return elem.deviceId
        })
        const users = await User.findAll({
            where: {
              id: {
                [Op.in]: mapsUser
              }
            }
          })
        const devices = await Device.findAll({
            where: {
              id: {
                [Op.in]: mapsDevice
              }
            }
          })
          let newMaps = comments.map( (elem) => {
            let findUser = users.find(x => x.id === elem.userId)
            let findDevice = devices.find(x => x.id === elem.deviceId)
            let userName =findUser.second_name + " " + findUser.first_name + " " + findUser.middle_name
            let deviceName = findDevice.name
            elem.dataValues['user_name'] = userName
            elem.dataValues['device_name'] = deviceName
            return elem
        })
        return res.json(newMaps)
      } catch (e) {
        next(ApiError.badRequest(e.message))
      }
    }

}

module.exports = new CommentController()