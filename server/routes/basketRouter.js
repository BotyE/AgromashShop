const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.post('/:id', basketController.addItem)
router.post('/', basketController.addStorageBasket)
router.get('/:id', basketController.getAll)
router.delete('/', basketController.clear)
router.delete('/:id', basketController.deleteItem)
router.put('/:id', basketController.updateCount)



module.exports = router