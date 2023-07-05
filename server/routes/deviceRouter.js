const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), deviceController.create)
router.get('/', deviceController.getAll)
router.get('/follow/:id', deviceController.getFollow)
router.get('/:id', deviceController.getOne)
router.delete('/:id', checkRole('ADMIN'), deviceController.deleteOne)
router.put('/:id', checkRole('ADMIN'), deviceController.changeOne)

module.exports = router