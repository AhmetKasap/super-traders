const { PortfolioModel } = require('../models/portfolio.model')
const { UserModel } = require('../models/user.model')
const { ShareModel } = require('../models/share.model')



const assosaction = () => {

  //? User Model - Portfolio Model (One to One)
  UserModel.hasOne(PortfolioModel, {
    foreignKey: 'userId', 
    onDelete: 'CASCADE', 
  })

  PortfolioModel.belongsTo(UserModel, {
    foreignKey: 'userId', 
  })


  //? Portfolio Model - Share Model (One to many)
  PortfolioModel.hasMany(ShareModel, {
    foreignKey: 'portfolioId', 
    onDelete: 'CASCADE', 
  })

  ShareModel.belongsTo(PortfolioModel, {
    foreignKey: 'portfolioId',
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
