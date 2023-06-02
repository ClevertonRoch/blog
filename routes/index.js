const express = require('express')
const router = express.Router()

const userRoutes = require('./Users')



router.use('/', userRoutes)


module.exports = router

