const router = require('express-promise-router')();
const productController = require('./controllers/product-controller');

router.post('/api/products', productController.createProduct);
router.get('/api/products', productController.listProducts);
router.get('/api/products/:id', productController.findProductById);
router.put('/api/products/:id', productController.updateProductById);
router.delete('/api/products/:id', productController.deleteProductById);

module.exports = router;