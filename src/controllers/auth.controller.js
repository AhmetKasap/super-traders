const userModel = require('../models/user.model')
const APIError = require('../utils/Error')
const Response = require('../utils/Response')
const bcrypt = require('bcrypt')
const authMiddlewares = require('../middlewares/auth.middlewares')

const login = async(req,res) => {
    const user = req.body
    console.log(user)

    const isThereEmail = await userModel.findOne({
        where : {email : user.email}
    })
    if(!isThereEmail) return new Response(null, 'check your login details').badRequest(res)
    
    const checkPassword = await bcrypt.compare(user.password, isThereEmail.password)
    
    if(checkPassword) authMiddlewares.createToken(isThereEmail,res)
            
    else return new Response(null, 'check your login details').badRequest(res)
}

const register = async(req,res) => {

    const user = req.body
    const password = await bcrypt.hash(user.password,10)

    const isThereUser = await userModel.findOne({
        where : {email : user.email}
    })
    if(isThereUser) return new Response(null, 'this email is already registered').badRequest(res)
     
    const userRegistered = await userModel.create({
        firstName : user.firstName,
        lastName : user.lastName,
        email : user.email,
        password : password
    })
    if(userRegistered) return new Response(null, 'registration successful').created(res)
    else throw new APIError('an error occurred during registration', 500)
    
}


module.exports = {
    login,
    register
}