const express = require('express')
const router = express.Router()

// eslint-disable-next-line no-unused-vars
const translationYup = require('./../middleware/validationYup/TranslationYup')

const userRoutes = require('./Users')
const productRoutes = require('./Products')
const categories = require('./Categories')
const subCategories = require('./SubCategories')





router.use('/', userRoutes)
router.use('/', productRoutes)
router.use('/', categories)
router.use('/', subCategories)


module.exports = router

