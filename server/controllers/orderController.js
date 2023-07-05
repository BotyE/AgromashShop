const {Order, User, Basket, BasketDevice, Device} = require('../models/models')
const ApiError = require('../middleware/ApiError')
const { sendOrderChanged, sendOrder } = require('../service/mailService');

class OrderController {
    async create(req, res, next) {
        try {
            var Sequelize = require('sequelize');
            const {userId,devices,individual,company,typePay,typeDelivery,typeDeliveryCompany,sum} = req.body
            const basket_device = JSON.parse(devices)
            const user = await User.findByPk(userId)
            const saleBasket = basket_device.map((elem => {elem.price = elem.price>elem.old_price ? Math.round((elem.price*((100-user.discount)/100))) : elem.price
                return elem}))
            const order = await Order.create(
                {
                    sum,
                    userId,
                    device_list: saleBasket,
                    individual: JSON.parse(individual),
                    company: JSON.parse(company),
                    type_pay: typePay,
                    type_delivery: typeDelivery + (typeDelivery==='Доставка транспортной компанией' ? ": " + typeDeliveryCompany : '')
                })
                sendOrder(order)
            const deviceBasket = await basket_device.map( async elem => {
                const updateDevice = await Device.update({count: Sequelize.literal(`count - ${elem.basket_count}`)}, {
                    where: {id:elem.id}
                })
            })
            const basket = await Basket.findOne({where: {userId: userId}})
            const basket_devices = await BasketDevice.destroy({where: {basketId: basket.id}})
            return res.json(basket_devices)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const orders = await Order.findAll()
            return res.json(orders)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getUserOrders(req, res, next) {
        try {
            let {id} = req.params

            const orders = await Order.findAll({
                where: {userId: id}
            })
            return res.json(orders)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeOne(req, res, next) {
        try {
            const {devices,individual,company,status} = req.body

            const ind = JSON.parse(individual)
            const device_list = JSON.parse(devices)
            const sum = device_list.reduce( (sum,elem) => {
                return sum+elem.price*elem.basket_count
            },0)
            let {id} = req.params
            const order = await Order.findByPk(id)
            if(order.status != status) {
                sendOrderChanged(ind.email,status,id)
            }
            const orders = await Order.update( {device_list, sum,individual: JSON.parse(individual),
                company: JSON.parse(company), status},
                {
                    where: {id}
                })
                
            return res.json(orders)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteOne(req, res, next) {
        try {
            const Sequelize = require('sequelize')
            const {id} = req.params
            const deleteOrder = await Order.findByPk(id)
            const deviceList = JSON.parse(deleteOrder.device_list)
            deviceList.map( async (elem) => {
                await Device.update({
                    count: Sequelize.literal(`count + ${elem.basket_count}`)
                },
                {
                    where: {id: elem.id}
                })
            })
            const order = await Order.destroy({
                where: {id}
            })
            return res.json(order)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const orders = await Order.findByPk(id)
            return res.json(orders)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


}

module.exports = new OrderController()