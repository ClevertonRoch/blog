const express = require('express')
const router = express.Router()

// eslint-disable-next-line no-unused-vars
const translationYup = require('./../middleware/validationYup/TranslationYup')

const userRoutes = require('./Users')



router.use('/', userRoutes)


module.exports = router

