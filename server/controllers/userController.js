const ApiError = require('../middleware/ApiError');
const bcrypt = require('bcrypt')
const uuid = require('uuid');
const jwt = require('jsonwebtoken')
const {User, Basket, Follow, Order, Recovery} = require('../models/models');
const { sendActivationMail, sendRecoveryMail } = require('../service/mailService');

const generateJwt = (id, email, role, discount) => {
    return jwt.sign(
        {id, email, role, discount},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password, first_name, second_name, middle_name, phone, role} = req.body
            if (!email || !password || !first_name || !second_name || !middle_name || !phone) {
                return next(ApiError.badRequest('Не правильно указаны данные'))
            }
            const emailCandidate = await User.findOne({where: {email}})
            if (emailCandidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const phoneCandidate = await User.findOne({where: {phone}})
            if (phoneCandidate) {
                return next(ApiError.badRequest('Пользователь с таким телефоном уже существует'))
            }
            const activationLink = uuid.v4();
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({email, role: "USER", first_name, second_name, middle_name, phone, password: hashPassword, discount: 0, activationLink})
            sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
            const basket = await Basket.create({userId: user.id})
            const follow = await Follow.create({userId: user.id})
            const token = generateJwt(user.id, user.email, user.role, user.discount)
            return res.json({token})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({where: {email}})
            if (!user) {
                return next(ApiError.internal('Пользователь не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'))
            }
            const token = generateJwt(user.id, user.email, user.role, user.discount)

            return res.json({token})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.role , req.user.discount)
            return res.json({token})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOneUser (req, res, next) {
        try {
            const {id} = req.params
            const user = await User.findByPk(id)
            if(!user) return next(ApiError.badRequest('Пользователь не найден'))
            const { password, ...newUser} = user.dataValues
            return res.json(newUser)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    
    async getAllUsers (req, res, next) {
        try {
            const users = await User.findAll()
            const usersMap = users.map( (elem) => {
                const orders = Order.findAndCountAll({
                    where: { userId: elem.id}
                })
    
                const { password, ...newUser} = elem.dataValues
                return newUser
            })
            return res.json(usersMap)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeInfo (req, res, next) {
        try {
            const {email, password, first_name, second_name, middle_name, phone} = req.body
            const {id} = req.params
            if (!email || !password || !first_name || !second_name || !middle_name || !phone) {
                return next(ApiError.badRequest('Не правильно указаны данные'))
            }
            
        
            const user = await User.findByPk(id)
            if(user.email != email) {
                
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            
            if(!comparePassword){
                return next(ApiError.badRequest('Пароль указан не правильно'))
            }

            if(user.email!=email){
                const candidate = await User.findOne({where: {email}})
                if (candidate) {
                    return next(ApiError.badRequest('Пользователь с таким email уже существует'))
                }
            }

            if(user.phone!=phone) {
                const candidate = await User.findOne({where: {phone}})
                if (candidate) {
                    return next(ApiError.badRequest('Пользователь с таким телефоном уже существует'))
                }
            }
            const activationLink = uuid.v4();
            const userOne = await User.update({
                email: email,
                isActivated: email != user.email ? !user.isActivated : user.isActivated,
                activationLink: email != user.email ? activationLink : user.activationLink,
                phone: phone,
                first_name: first_name,
                middle_name: middle_name,
                second_name: second_name},{
                where: {id:id}
            })
            if(user.email!=email) {
                sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
            }
            return res.json(userOne)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteOneUser (req, res, next) {
        try {
            const {id} = req.params
            const user = await User.destroy({
                where: {id:id}})
            return res.json(user)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeUserInAdmin (req, res, next) {
        try {
            const {email, first_name, second_name, middle_name, phone, discount} = req.body.params
            const {id} = req.params
            if (!email || !first_name || !second_name || !middle_name || !phone) {
                return next(ApiError.badRequest('Не правильно указаны данные'))
            }
            const newDiscount = !discount ? 0 : discount;

            const user = await User.findByPk(id)

            if(user.email!=email){
                const candidate = await User.findOne({where: {email}})
                if (candidate) {
                    return next(ApiError.badRequest('Пользователь с таким email уже существует'))
                }
            }

            if(user.phone!=phone) {
                const candidate = await User.findOne({where: {phone}})
                if (candidate) {
                    return next(ApiError.badRequest('Пользователь с таким телефоном уже существует'))
                }
            }
            const userOne = await User.update({
                email: email,
                phone: phone,
                first_name: first_name,
                middle_name: middle_name,
                second_name: second_name,
                discount: newDiscount
            },{
                where: {id:id}
            })

            return res.json(userOne)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    async recoveryPassword(req, res, next) {
        try {
            const {email} = req.body
            const user = await User.findOne({where: {email: email}})

            if(!user)
                return next(ApiError.badRequest('Пользователя с такой почтой не существует'))
            
            const request = await Recovery.findOne({where: {userId: user.id }})
            if(!request)
            {
                const recoveryLink = uuid.v4();
                const recovery = await Recovery.create({link: recoveryLink, userId: user.id})
                sendRecoveryMail(email, `${process.env.CLIENT_URL}/recovery/${recoveryLink}`)
                return res.json(200)
            }
            else {
                const recoveryLink = uuid.v4();
                request.link = recoveryLink
                request.save()
                sendRecoveryMail(email, `${process.env.CLIENT_URL}/recovery/${recoveryLink}`)
                return res.json(200)
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async recoveryConfirm(req, res, next) {
        try {
            const {password,id} = req.body
            const request = await Recovery.findOne({where: {link: id }})
            if(!request)
                return next(ApiError.badRequest('Данной ссылки не существует'))
            const user = await User.findOne({where: {id: request.userId}})

            if(!user)
                return next(ApiError.badRequest('Пользователь не найден'))
            const hashPassword = await bcrypt.hash(password, 5)
            user.password = hashPassword;
            user.save()
            request.destroy()
            request.save()
            return res.json(200)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController()