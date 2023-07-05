const Router = require('express')
const router = new Router()
const filterController = require('../controllers/filterController')


router.get('/', filterController.getSearch)



module.exports = router