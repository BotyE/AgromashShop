const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', orderController.create)
router.get('/', checkRole('ADMIN'), orderController.getAll)
router.get('/user/:id', orderController.getUserOrders)
router.get('/:id', orderController.getOne)
router.put('/:id', checkRole('ADMIN'), orderController.changeOne)
router.delete('/:id', orderController.deleteOne)


module.exports = router