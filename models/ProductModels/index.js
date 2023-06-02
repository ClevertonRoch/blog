const connection = require('../../database/connection')
const Sequelize = require('sequelize')
// const User = require('./../UserModels')
// const bcrypt = require('bcrypt')

const Product = connection.define('products',{
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }

})

// Product.belongsTo(User)
// User.hasMany(Product)

// Product.sync({force: true}) 

module.exports = Product


