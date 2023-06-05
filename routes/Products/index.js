const express = require('express')
const router = express.Router()

const productController = require('./../../controllers/ProductsControllers')



// router.get('/products', productController.create)
router.post('/product', productController.create)



module.exports = router