const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/getOne/:id', authMiddleware, userController.getOneUser)
router.get('/getAll', checkRole('ADMIN'), userController.getAllUsers)
router.put('/changeOne/:id', authMiddleware, userController.changeInfo)
router.delete('/:id', checkRole('ADMIN'), userController.deleteOneUser)
router.put('/changeUserInAdmin/:id', checkRole('ADMIN'), userController.changeUserInAdmin)
router.post('/recovery', userController.recoveryPassword)
router.put('/recovery', userController.recoveryConfirm)

module.exports = router