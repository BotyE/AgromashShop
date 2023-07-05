const Router = require('express')
const router = new Router()
const commentController = require('../controllers/commentController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', commentController.addComment)
router.put('/:id', checkRole('ADMIN'), commentController.agreeComment)
router.get('/:id', commentController.getComments)
router.get('/', checkRole('ADMIN'), commentController.getAllComments)
router.delete('/:id', checkRole('ADMIN'), commentController.deleteComment)



module.exports = router