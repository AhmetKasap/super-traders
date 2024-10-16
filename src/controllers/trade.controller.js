const Response = require('../utils/Response');
const { UserModel } = require('../models/user.model');
const { TradeModel } = require('../models/trade.model');
const { ShareModel } = require('../models/share.model');
const { PortfolioModel } = require('../models/portfolio.model');

const buy = async (req, res) => {
  const authUser = req.authUser;
  const tradeInfo = req.body;

  if (!authUser) return new Response(null, 'Please log in').unauthorized(res);

  const user = await UserModel.findOne({
    where: { email: authUser.email },
    include: { model: PortfolioModel },
  });
  if (!user) return new Response(null, 'User not found').notfound(res);

  const share = await ShareModel.findOne({ where: { id: tradeInfo.shareId } });
  if (!share) return new Response(null, 'Share not found').notfound(res);

  if (share.quantity < tradeInfo.quantity) {
    return new Response(null, 'Not enough shares available to buy').badRequest(res);
  }

  const newTrade = await TradeModel.create({
    userId: user.id,
    shareId: share.id,
    tradeType: 'BUY',
    quantity: tradeInfo.quantity,
  });

  return new Response(newTrade, 'Trade successful').ok(res);
};

const sell = async (req, res) => {
  const authUser = req.authUser;
  const tradeInfo = req.body;

  if (!authUser) return new Response(null, 'Please log in').unauthorized(res);

  const user = await UserModel.findOne({
    where: { email: authUser.email },
    include: { model: PortfolioModel },
  });
  if (!user) return new Response(null, 'User not found').notfound(res);

  const share = await ShareModel.findOne({ where: { id: tradeInfo.shareId } });
  if (!share) return new Response(null, 'Share not found').notfound(res);

  const trades = await TradeModel.findAll({
    where: { userId: user.id, shareId: share.id, tradeType: 'BUY' },
  });
  const totalPurchasedQuantity = trades.reduce((total, trade) => total + trade.quantity, 0);

  if (tradeInfo.quantity > totalPurchasedQuantity) {
    return new Response(null, 'Insufficient quantity to sell').badRequest(res);
  }

  const newTrade = await TradeModel.create({
    userId: user.id,
    shareId: share.id,
    tradeType: 'SELL',
    quantity: tradeInfo.quantity,
  });

  return new Response(newTrade, 'Trade successful').ok(res);
};

module.exports = {
  buy,
  sell,
};
