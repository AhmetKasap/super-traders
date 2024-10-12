const express = require('express')
const router = express.Router()

const userRoutes = require('./user.routes')
const adminRoutes = require('./admin.routes')
const shareRoutes = require('./share.routes')

router.use('/users', userRoutes)
router.use('/admin', adminRoutes)
router.use('/shares', shareRoutes)



module.exports = router