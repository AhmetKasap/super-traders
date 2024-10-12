const userModel = require('../models/user.model')

const login = async(req,res) => {

    const mod = await userModel.create({
        firstNmae : "ahmet",
        lastname : "kasap",
        email : "aahmetkasap@gmail.com",
        password : "test"
    })
    console.log(mod)

}

const register = async(req,res) => {

    const user = req.body
    const mod = await userModel.create({
        firstName : "ahmet",
        lastName : "kasap",
        email : "aahmetkasap@gmail.com",
        password : "test"
    })
    console.log(mod)
    
}


module.exports = {
    login,
    register
}