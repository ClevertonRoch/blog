const connection = require('./../../database/connection')
const Sequelize = require('sequelize')
const Category = require('./../../models/Categories')


const SubCategory = connection.define('subcategories', {
  subCategory: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})

SubCategory.belongsTo(Category)
Category.hasMany(SubCategory)


module.exports = SubCategory