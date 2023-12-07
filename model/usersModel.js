const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const UserModel = sequelize.define('users_tb',{
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ispremiumuser: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

  
module.exports = UserModel;