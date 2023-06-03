const express = require('express')
const router = express.Router()

const userSchema = require('./../../middleware/validationYup/schemasYup/userSchema')
const validationData = require('../../middleware/validationYup/validationData')

const userController = require('./../../controllers/UserControllers')

const authenticate = require('./../../middleware/auth/index')

 

router.get('/users', authenticate, userController.findAll)
router.get('/user/:id?', authenticate, validationData(userSchema.idUserSchema,'params'), userController.findOne)
router.delete('/user/:id?', authenticate, validationData(userSchema.idUserSchema,'params'), userController.destroy)
router.post('/user', authenticate,validationData(userSchema.createUserSchema,'body') ,userController.create)
router.put('/user', authenticate,validationData(userSchema.updateUserSchema,'body') ,userController.update)
router.post('/user/auth', authenticate,validationData(userSchema.authUserSchema,'body') ,userController.authention)



module.exports = router