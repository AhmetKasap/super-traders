const express = require('express')
const router = express.Router()

const {login,register} = require('../controllers/user.controller')
const {registerValidation,loginValidation} = require('../middlewares/validations/user.auth.validations')

router.post('/register', registerValidation, register)
router.post('/login', loginValidation, login)



module.exports = router