const {AdminModel} = require('../models/admin.model')
const APIError = require('../utils/Error')
const Response = require('../utils/Response')
const bcrypt = require('bcrypt')
const adminAuthMiddlewares = require('../middlewares/auth/admin.auth.middlewares')

const login = async(req,res) => {
    const admin = req.body

    const isThereEmail = await AdminModel.findOne({
        where : {email : admin.email}
    })
    if(!isThereEmail) return new Response(null, 'check your login details').badRequest(res)
    
    const checkPassword = await bcrypt.compare(admin.password, isThereEmail.password)
    
    if(checkPassword) adminAuthMiddlewares.createToken(isThereEmail,res)
            
    else return new Response(null, 'check your login details').badRequest(res)
}

const register = async(req,res) => {

    const admin = req.body
    const password = await bcrypt.hash(admin.password,10)

    const isThereAdmin = await AdminModel.findOne({
        where : {email : admin.email}
    })
    if(isThereAdmin) return new Response(null, 'this email is already registered').badRequest(res)
     
    const adminRegistered = await AdminModel.create({
        email : admin.email,
        password : password
    })
    if(adminRegistered) return new Response(null, 'registration successful').created(res)
    else throw new APIError('an error occurred during registration', 500)
    
}


module.exports = {
    login,
    register
}