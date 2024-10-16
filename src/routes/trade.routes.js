const express = require('express')
const router = express.Router()

const {buy,sell} = require('../controllers/trade.controller')
const userAuthMiddelwares = require('../middlewares/auth/user.auth.middlewares') 
const {tradeValidation} = require('../middlewares/validations/trade.validations')

router.post('/buy', userAuthMiddelwares.checkToken, tradeValidation, buy)
router.post('/sell', userAuthMiddelwares.checkToken, tradeValidation, sell)



module.exports = router