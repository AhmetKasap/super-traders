
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('super-traders', 'admin', 'admin', {
  host: 'localhost', // Docker konteyneriniz localhost üzerinde çalışıyor
  dialect: 'postgres', // Kullanılan veritabanı
  port: 5432 // Docker'da belirttiğiniz port
});


const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = connection