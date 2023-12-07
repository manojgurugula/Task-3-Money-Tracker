const Sequelize = require('sequelize');
const sequelize =require('../utils/database')

const ForgotPassword = sequelize.define('forgotpassword_tb', {
    id:{
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    active: Sequelize.BOOLEAN,  
});

module.exports = ForgotPassword;

