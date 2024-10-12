
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('super-traders', 'admin', 'admin', {
  host: 'localhost', 
  dialect: 'postgres', 
  port: 5432 
});


const connectDB  = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
      } catch (error) {
        console.error('Unable to connect to the database:', error)
      }
}



module.exports = {
  sequelize,connectDB 

}