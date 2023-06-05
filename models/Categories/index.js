const connection = require('./../../database/connection')
const Sequelize = require('sequelize')

const Category = connection.define('categories',{
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

// Category.sync({force: true})

module.exports = Category
