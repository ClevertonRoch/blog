// db.js
const Sequelize = require('sequelize')
const config = require('./config')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  timezone: '-03:00',
  dialect: 'mysql',
})

sequelize.authenticate().then(() =>{
  console.log('conexao ok')
}).catch(err =>{
  console.log('erro de conexao'+ err)

})

module.exports = sequelize