const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.connection')
const {ShareModel} = require('../models/share.model')


const TradeModel = sequelize.define('Trades', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  shareId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  tradeType: {
    type: DataTypes.ENUM('BUY', 'SELL'),
    allowNull: false,
  },

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1, 
    },
  },

}, {
  hooks: {
    afterCreate: async (trade) => {
      const share = await ShareModel.findOne({ where: { id: trade.shareId } });
      if (trade.tradeType === 'BUY') {
        await share.update({ quantity: share.quantity - trade.quantity });
      } else if (trade.tradeType === 'SELL') {
        await share.update({ quantity: share.quantity + trade.quantity });
      }
    },
  },
})


module.exports = {TradeModel}
