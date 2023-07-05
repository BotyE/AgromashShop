const {User} = require('../models/models')
const ApiError = require('../middleware/ApiError')

class MailController {

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            const user = await User.findOne({activationLink})
            if (!user) {
                throw ApiError.BadRequest('Неккоректная ссылка активации')
            }
            user.isActivated = true;
            await user.save();
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new MailController()