const express = require('express')
const router = express.Router()

const {getPortfolios} = require('../controllers/portfolio.controller')
const userAuthMiddelwares = require('../middlewares/auth/user.auth.middlewares') 

router.get('/', userAuthMiddelwares.checkToken, getPortfolios)



module.exports = router