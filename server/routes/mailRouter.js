const Router = require('express')
const router = new Router()
const typeController = require('../controllers/mailController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/:link', typeController.activate)

module.exports = router