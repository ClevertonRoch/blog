const express = require('express')
const router = express.Router()

const subCategoryController = require('../../controllers/SubCategoryControllers')
const subCatSchema = require('./../../middleware/validationYup/schemasYup/subCatSchema')
const validaDataYup = require('../../middleware/validationYup/validationData')

router.get('/subcategory', subCategoryController.findAll)
router.get('/subcategory/:id', validaDataYup(subCatSchema.id,'params'), subCategoryController.findId)
router.post('/subcategory',validaDataYup(subCatSchema.create,'body'),subCategoryController.create)
router.put('/subcategory',validaDataYup(subCatSchema.update,'body'),subCategoryController.update)
router.delete('/subcategory/:id?',validaDataYup(subCatSchema.id,'params'),subCategoryController.destroy)


module.exports = router