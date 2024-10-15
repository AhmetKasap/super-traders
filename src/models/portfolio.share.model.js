const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.connection');

const PortfolioShareModel = sequelize.define('PortfolioShares', {
  portfolioId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Portfolios', // Portfolios tablosuna referans
      key: 'id',
    },
  },
  shareId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Shares', // Shares tablosuna referans
      key: 'id',
    },
  },
});

module.exports = { PortfolioShareModel };
