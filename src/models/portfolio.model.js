const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.connection')



const PortfolioModel = sequelize.define('Portfolios', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique : true
  }



})


module.exports = {PortfolioModel}
