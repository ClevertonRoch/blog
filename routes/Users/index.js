const express = require('express')
const router = express.Router()

const userSchema = require('./../../middleware/validationYup/schemasYup/userSchema')
const validationData = require('../../middleware/validationYup/validationData')

const userController = require('./../../controllers/UserControllers')

const authenticate = require('./../../middleware/auth/index')

 

router.get('/users',authenticate,userController.findAll)
router.get('/user/:id?',authenticate,validationData(userSchema.id,'params'), userController.findOne)
router.delete('/user/:id?',authenticate,validationData(userSchema.id,'params'), userController.destroy)
router.post('/user',authenticate,validationData(userSchema.create,'body') ,userController.create)
router.put('/user',authenticate,validationData(userSchema.update,'body') ,userController.update)
router.post('/user/auth',validationData(userSchema.authenticate,'body') ,userController.authenticate)



module.exports = router