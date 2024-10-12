const userModel = require('../models/user.model')
const APIError = require('../utils/Error')
const Response = require('../utils/Response')

const login = async(req,res) => {

   

}

const register = async(req,res) => {

    const user = req.body

    const isThereUser = await userModel.findOne({
        where : {email : user.email}
    })
    if(isThereUser) return new Response(null, 'this email is already registered').badRequest(res)
     
    const userRegistered = await userModel.create({
        firstName : user.firstName,
        lastName : user.lastName,
        email : user.email,
        password : user.password
    })
    if(userRegistered) return new Response(null, 'registration successful').created(res)
    
}


module.exports = {
    login,
    register
}