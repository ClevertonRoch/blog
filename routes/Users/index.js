const express = require('express')
const router = express.Router()

const userSchema = require('./../../middleware/validationYup/schemasYup/userSchema')
const validationData = require('../../middleware/validationYup/validationData')

const userController = require('./../../controllers/UserControllers')

 

router.get('/users', userController.findAll)
router.post('/user',validationData(userSchema.createUserSchema,'body') ,userController.create)



module.exports = router