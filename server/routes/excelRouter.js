const Router = require('express')
const router = new Router()
const excelController = require('../controllers/excelController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), excelController.getAll)



module.exports = router