const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.connection');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate : {
      notEmpty : true
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate : {
      notEmpty : true
    }
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

module.exports = User
