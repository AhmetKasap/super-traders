const jwt = require('jsonwebtoken')
const Response = require('../../utils/Response')
const {UserModel} = require('../../models/user.model')
const APIError = require('../../utils/Error')
require('dotenv').config()


const createToken = async (user,res) => {
    const payload = {
        id : user.id,
        email : user.email
    }
    console.log(payload)
    const token = await jwt.sign({payload}, process.env.JWT_SECRET, {expiresIn : process.env.JWT_EXPIRES_IN, algorithm:"HS512"})
    
    if (token) {
        const response = {
            user, token
        }
        return new Response(response, "token created successfully, login successfully").ok(res)
    }
    else throw new APIError("An error occurred while creating the token", 500)
} 

const checkToken = async (req,res,next) => {
    const bearerToken = req.headers.authorization && req.headers.authorization.startsWith('Bearer ')
    if(! bearerToken) {
        return new Response(null, 'Token not found, please log in.').unauthorized(res)
    } 
    else {
        const token = req.headers.authorization.split(' ')[1]
        await jwt.verify(token, process.env.JWT_SECRET, async (err,decoded) => {
            if(err) {
                throw new APIError("Token could not be decoded", 500)
            }
            else {
                const userInfo = await UserModel.findOne({where : {id : decoded.payload.id}})
                //console.log("user Info :", userInfo)
                if(!userInfo) {
                    throw new APIError("User not found in the database", 404)
                }
                else{
                    req.authUser = userInfo         //Either one works,
                    //res.locals.authUser = userInfo;
                    next()
                }
            }
        })
    }
}





module.exports = {
    createToken,checkToken
}