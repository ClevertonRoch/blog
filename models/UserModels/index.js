const connection = require('../../database/connection')
const Sequelize = require('sequelize')
// const bcrypt = require('bcrypt')

const User = connection.define('users',{
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
    
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }

})



module.exports = User


