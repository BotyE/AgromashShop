const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const followRouter = require('./followRouter')
const basketRouter = require('./basketRouter')
const orderRouter = require('./orderRouter')
const sliderRouter = require('./sliderRouter')
const commentRouter = require('./commentRouter')
const filterRouter = require('./filterRouter')
const shopRouter = require('./shopRouter')
const mailRouter = require('./mailRouter')
const excelRouter = require('./excelRouter')
const feedbackRouter = require('./feedbackRouter')




router.use('/user', userRouter)
router.use('/device', deviceRouter)
router.use('/category', categoryRouter)
router.use('/follow', followRouter)
router.use('/basket', basketRouter)
router.use('/order', orderRouter)
router.use('/slider', sliderRouter)
router.use('/comments', commentRouter)
router.use('/filter', filterRouter)
router.use('/shop', shopRouter)
router.use('/activate', mailRouter)
router.use('/excel', excelRouter)
router.use('/feedback', feedbackRouter)

module.exports = router