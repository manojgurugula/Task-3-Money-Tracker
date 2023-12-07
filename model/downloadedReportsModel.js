const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const DownloadedReports = sequelize.define('downloadedReports_tb',{
    fileUrl: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      }
});

module.exports = DownloadedReports;