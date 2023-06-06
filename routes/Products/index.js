const express = require('express')
const router = express.Router()

const productController = require('./../../controllers/ProductsControllers')
const subCatSchema = require('../../middleware/validationYup/schemasYup/productSchema')
const validaDataYup = require('../../middleware/validationYup/validationData')
const authenticate = require('./../../middleware/auth/index')

router.get('/products', productController.findAll)
router.get('/product/:id', validaDataYup(subCatSchema.id, 'params'), productController.findByPk)
router.post('/product',authenticate, validaDataYup(subCatSchema.create, 'body'), productController.create)
router.put('/product',authenticate, validaDataYup(subCatSchema.update, 'body'), productController.update)
router.delete('/product/:id?',authenticate, validaDataYup(subCatSchema.id, 'params'), productController.destroy)



module.exports = router