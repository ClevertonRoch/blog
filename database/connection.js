const Sequelize = require('sequelize')

const connection = new Sequelize('catalag','root','filhotinho',{
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = connection