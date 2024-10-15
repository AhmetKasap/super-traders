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

const sell = async (req, res) => {
    const authUser = req.authUser
    const tradeInfo = req.body

    if (!authUser) return new Response(null, 'please log in').unauthorized(res)

    const user = await UserModel.findOne({ where: { email: authUser.email }, include: { model: PortfolioModel } })
    if (!user) return new Response(null, 'user not found').notfound(res)

    // Kullanıcının portföyünü kontrol et
    const portfolio = await PortfolioModel.findOne({ where: { userId: user.id } })
    if (!portfolio) return new Response(null, 'portfolio not found').notfound(res)

    const share = await ShareModel.findOne({ where: { id: tradeInfo.shareId } })
    if (!share) return new Response(null, 'share not found').notfound(res)

    // Kullanıcının daha önce alım yaptığı hissenin miktarını kontrol et
    const trades = await TradeModel.findAll({ where: { userId: user.id, shareId: share.id, tradeType: 'BUY' } })
    const totalPurchasedQuantity = trades.reduce((total, trade) => total + trade.quantity, 0)

    // Satış işlemi için yeterli miktar var mı kontrol et
    if (tradeInfo.quantity > totalPurchasedQuantity) {
        return new Response(null, 'insufficient quantity to sell').badRequest(res)
    }

    // Yeni satış işlemini kaydet
    const newTrade = await TradeModel.create({
        userId: user.id,
        shareId: share.id,
        tradeType: 'SELL',
        quantity: tradeInfo.quantity,
    });

    // Satışın ardından hisse miktarını artır
    await share.update({ quantity: share.quantity + tradeInfo.quantity })

    console.log(newTrade)
    return new Response(newTrade, 'Trade successful').ok(res)
}



module.exports = {
    buy,sell
}