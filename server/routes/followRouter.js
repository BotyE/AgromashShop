const Router = require('express')
const router = new Router()
const followController = require('../controllers/followController')

router.get('/:id', followController.getAll)
router.delete('/', followController.deleteOne)
router.post('/', followController.addOne)
router.get('/', followController.getOne)


module.exports = router