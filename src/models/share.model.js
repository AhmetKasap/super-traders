const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db.connection')

const ShareModel = sequelize.define('Shares', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
    validate: {
      notEmpty: true,
      isUppercase: true, 
      len: [3, 3], 
    },
  },
  price: {
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false,
    validate: {
      notEmpty: true,
      isDecimal: true, 
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0, 
    },
  },
})

module.exports = {ShareModel}
