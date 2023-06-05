const express = require('express')
const router = express.Router()

const CategoryController = require('./../../controllers/CategoryControllers')
const categorySchema = require('./../../middleware/validationYup/schemasYup/categoryShema')
const validationData = require('../../middleware/validationYup/validationData')


router.get('/categories',validationData(categorySchema.update,'body') ,CategoryController.findAll)
router.get('/category/:id?',validationData(categorySchema.id,'params') ,CategoryController.findByPk)
router.post('/category',validationData(categorySchema.create,'body'), CategoryController.create)
router.put('/category',validationData(categorySchema.update,'body'), CategoryController.update)
router.delete('/category/:id?',validationData(categorySchema.id,'params'), CategoryController.destroy)

module.exports = router