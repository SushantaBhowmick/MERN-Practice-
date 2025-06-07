const express = require('express');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/prodController');
const { uploadMultipleCloud } = require('../utils/cloudinary');
const router = express.Router();

router.route('/').get(getAllProducts)
router.route('/create').post(uploadMultipleCloud, createProduct)
router.route('/:id').get(getProductById)
router.route('/:id').put(updateProduct)
router.route('/:id').delete(deleteProduct)

module.exports = router;