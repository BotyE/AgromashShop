const {Follow, FollowDevice} = require('../models/models')
const ApiError = require('../middleware/ApiError')

class FollowController {

    async getAll(req, res, next) {
        try {
            let {id} = req.params
            const follows = await Follow.findOne({
                where: {userId: id}
            })
            const followDevice = await FollowDevice.findAll({
                where: {followId: follows.id}
            })
            
            return res.json(followDevice)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async addOne(req, res, next) {
        try {
            let {userId, deviceId} = req.body
            const follows = await Follow.findOne({
                where: {userId: userId}
            })

            const followDevice = await FollowDevice.create({followId: follows.id, deviceId: deviceId})
            return res.json(followDevice)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteOne(req, res, next) {
        try {
            let { userId, deviceId } = req.query
        const follows = await Follow.findOne({
            where: {userId: userId}
        })
        const followDevice = await FollowDevice.destroy({
            where: {
                followId: follows.id, 
                deviceId: deviceId}
        })
        return res.json(followDevice)
    } catch (e) {
        next(ApiError.badRequest(e.message))
    
    }
    
    }
    
    async getOne(req, res,next) {
        try {
            let { userId, deviceId } = req.query
            const follows = await Follow.findOne({
                where: {userId: userId}
            })
            const followDevice = await FollowDevice.findOne({
                where: {
                    followId: follows.id, 
                    deviceId: deviceId
                }
            })
            if(followDevice)
                return res.json(true)
            else return res.json(false)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new FollowController()