const Response = require('../utils/Response')
const { UserModel } = require('../models/user.model')
const { TradeModel } = require('../models/trade.model')
const { ShareModel } = require('../models/share.model')
const { PortfolioModel } = require('../models/portfolio.model')

const getPortfolios = async (req, res) => {
    const authUser = req.authUser

    if (!authUser) return new Response(null, 'please log in').unauthorized(res)

    const user = await UserModel.findOne({ where: { email: authUser.email }, include: { model: TradeModel } })
    if (!user) return new Response(null, 'user not found').notfound(res)
    
    const sharesId = user.Trades.map(trade => trade.dataValues.shareId)

    // Hisse senetlerini al
    const shares = await ShareModel.findAll({ where: { id: sharesId } })
    console.log(shares);

    // Portföyü oluştur
    const portfolio = shares.map(share => {
        const totalQuantity = user.Trades
            .filter(trade => trade.shareId === share.id)
            .reduce((acc, trade) => {
                return acc + (trade.tradeType === 'BUY' ? trade.quantity : -trade.quantity)
            }, 0);

        // Hisse senedinin toplam değeri
        const totalValue = (totalQuantity * share.price).toFixed(2)

        return {
            id: share.id,
            name: share.name,
            currentQuantity: totalQuantity, 
            totalValue: parseFloat(totalValue) 
        };
    });

    return new Response(portfolio, 'User portfolio retrieved successfully').ok(res)
};

module.exports = { getPortfolios }
