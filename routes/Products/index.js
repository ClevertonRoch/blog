const express = require('express')
const router = express.Router()

const productController = require('./../../controllers/ProductsControllers')
const subCatSchema = require('../../middleware/validationYup/schemasYup/productSchema')
const validaDataYup = require('../../middleware/validationYup/validationData')


router.get('/subcategory', productController.findAll)
router.get('/subcategory/:id', validaDataYup(subCatSchema.id, 'params'), productController.findByPk)
router.post('/subcategory', validaDataYup(subCatSchema.create, 'body'), productController.create)
router.put('/subcategory', validaDataYup(subCatSchema.update, 'body'), productController.update)
router.delete('/subcategory/:id?', validaDataYup(subCatSchema.id, 'params'), productController.destroy)



module.exports = router