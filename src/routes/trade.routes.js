const express = require('express')
const router = express.Router()

const {buy,sell} = require('../controllers/trade.controller')
const userAuthMiddelwares = require('../middlewares/auth/user.auth.middlewares') 

router.post('/buy', userAuthMiddelwares.checkToken, buy)
router.post('/sell', )



module.exports = router