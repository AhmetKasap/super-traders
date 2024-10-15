const express = require('express')
const router = express.Router()

const userRoutes = require('./user.routes')
const adminRoutes = require('./admin.routes')
const shareRoutes = require('./share.routes')
const tradeRoutes = require('./trade.routes')
const portfolioRoutes = require('./portfolio.routes')

router.use('/users', userRoutes)
router.use('/admin', adminRoutes)
router.use('/shares', shareRoutes)
router.use('/trades', tradeRoutes)
router.use('/portfolios', portfolioRoutes)





module.exports = router