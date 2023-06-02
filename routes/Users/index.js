const express = require('express')
const router = express.Router()
const userController = require('./../../controllers/UserControllers')



router.get('/users', userController.findAll)
router.post('/user', userController.create)



module.exports = router