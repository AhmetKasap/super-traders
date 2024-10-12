const jwt = require('jsonwebtoken')
const Response = require('../../utils/Response')
const adminModel = require('../../models/admin.model')
const APIError = require('../../utils/Error')
require('dotenv').config()


const createToken = async (admin,res) => {
    const payload = {
        id : admin.id,
        email : admin.email
    }
    const token = await jwt.sign({payload}, process.env.JWT_SECRET, {expiresIn : process.env.JWT_EXPIRES_IN, algorithm:"HS512"})
    
    if (token) {
        const response = {
            admin, token
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
                const adminInfo = await adminModel.findOne({where : {id : decoded.payload.id}})
                //console.log("admin Info :", adminInfo)
                if(!adminInfo) {
                    throw new APIError("User not found in the database", 404)
                }
                else{
                    req.authAdmin = adminInfo.dataValues         
                    next()
                }
            }
        })
    }
}





module.exports = {
    createToken,checkToken
}