const Response = require('../utils/Response')
const {UserModel} = require('../models/user.model')
const {TradeModel} = require('../models/trade.model')
const {ShareModel} = require('../models/share.model')
const {PortfolioModel} = require('../models/portfolio.model')

const buy = async(req,res) => {
    const authUser = req.authUser
    const tradeInfo = req.body
    console.log(tradeInfo)

    if(!authUser) return new Response(null, 'please log in').unauthorized(res)

    const user = await UserModel.findOne({where : {email : authUser.email} , include : {model :PortfolioModel }})
    if(!user) return new Response(null, 'user not found').notfound(res)

    console.log(user.Portfolio.dataValues)
    
    const shareId = await ShareModel.findOne({where : {id : tradeInfo.shareId}})
    if(!shareId) return new Response(null, 'share not found').notfound(res)

    const newTrade = await TradeModel.create({
        userId : user.id,
        shareId : shareId.dataValues.id,
        tradeType : tradeInfo.tradeType,
        quantity : tradeInfo.quantity        
    })
    console.log(newTrade)
    

}

const sell = async(req,res) => {
    
}



module.exports = {
    buy,sell
}