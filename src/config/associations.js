const { PortfolioModel } = require('../models/portfolio.model')
const { UserModel } = require('../models/user.model')
const { ShareModel } = require('../models/share.model')
const {TradeModel} = require('../models/trade.model')
const {PortfolioShareModel} = require('../models/portfolio.share.model')

const assosaction = () => {

  //? User Model - Portfolio Model (One to One)
  UserModel.hasOne(PortfolioModel, {
    foreignKey: 'userId', 
    onDelete: 'CASCADE', 
  })

  PortfolioModel.belongsTo(UserModel, {
    foreignKey: 'userId', 
  })


  //? Portfolio Model - Share Model (many to many)
  PortfolioModel.belongsToMany(ShareModel, {
    through: PortfolioShareModel,
    foreignKey: 'portfolioId',
    otherKey: 'shareId',
  })
  
  // Share - PortfolioShare ilişkisi
  ShareModel.belongsToMany(PortfolioModel, {
    through: PortfolioShareModel,
    foreignKey: 'shareId',
    otherKey: 'portfolioId',
  })


   //? User Model - Trade Model (One to many)
  UserModel.hasMany(TradeModel, {
    foreignKey: 'userId', 
    onDelete: 'CASCADE', 
  })

  TradeModel.belongsTo(UserModel, {
    foreignKey: 'userId',
  })


  //? Trade Model - Share Model (Many to one)
  ShareModel.hasMany(TradeModel, {
    foreignKey: 'shareId', 
    onDelete: 'CASCADE', 
  })

  TradeModel.belongsTo(ShareModel, {
    foreignKey: 'shareId',
  })

}



module.exports = {assosaction}
