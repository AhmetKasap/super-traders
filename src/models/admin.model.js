const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.connection');

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate : {
      isEmail : true,
      notEmpty : true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate : {
      notEmpty : true
    }
  },
})

module.exports = Admin
