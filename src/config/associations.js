const {PortfolioModel} = require('../models/portfolio.model')
const {UserModel} = require('../models/user.model')
const {ShareModel} = require('../models/share.model')

//! USER PROFİLE (ONE TO ONE RELATIONS)

UserModel.hasOne(PortfolioModel, {
    foreignKey: 'userId', // Portfolio modelindeki userId ile ilişkilendiriliyor
    onDelete: 'CASCADE', // User silindiğinde, ona ait portföy de silinsin
  })

PortfolioModel.belongsTo(UserModel, {
    foreignKey: 'userId', // User modelindeki id ile ilişkilendiriliyor
})
  