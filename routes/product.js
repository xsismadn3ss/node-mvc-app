const express = require("express");
const productController = require('../controllers/productController')

const router = express.Router();
router.get('/productos', productController.productView)
router.post('/productos', productController.registerProduct)
router.post('/productos/:id/edit', productController.editProduct)
router.post('/productos/:id/delete', productController.deleteProduct)

module.exports = router;
