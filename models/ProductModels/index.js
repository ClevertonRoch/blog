const connection = require('../../database/connection')
const Sequelize = require('sequelize')
const User = require('./../UserModels')
const Category = require('./../../models/Categories')
const SubCategory = require('./../../models/SubCategories')


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

Product.belongsTo(User)
Product.belongsTo(Category)
Product.belongsTo(SubCategory)


module.exports = Product


