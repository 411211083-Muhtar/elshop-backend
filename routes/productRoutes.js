const express = require('express');
const productController = require('../controllers/productController');
const authenticateToken = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/', authenticateToken, upload.single('image'), productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.put('/:id', authenticateToken, upload.single('image'), productController.updateProduct);
router.delete('/:id', authenticateToken, productController.deleteProduct);

module.exports = router;
