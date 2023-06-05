const connection = require('./../../database/connection')
const Sequelize = require('sequelize')
const Category = require('./../../models/Categories')


const SubCategory = connection.define('subcategories', {
  subCategory: {
    type: Sequelize.STRING,
    allowNull: false
    
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})

SubCategory.belongsTo(Category)



module.exports = SubCategory