const ApiError = require('../middleware/ApiError')
const { sendFeedbackMail,sendUnderOrderMail } = require('../service/mailService')

class FeedbackController {
    async sendFeedback(req, res, next) {
        try {
        const {email, fio, text, phone} = req.body
        sendFeedbackMail(email,phone,text,fio)
        return res.json({})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async sendUnderOrder(req, res, next) {
        try {
        const {email, fio, product, phone} = req.body
        sendUnderOrderMail(email,phone,product,fio)
        return res.json({})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new FeedbackController()