const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.connection')



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




})


module.exports = {TradeModel}
