const express = require('express');
const { addToCart, getCart, updateCartItem, deleteCartItem, clearCart } = require('../controllers/cartController');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const router = express.Router()

router.route('/add-item').post(isAuthenticated, addToCart)
router.route('/').get(isAuthenticated, getCart)
router.route('/:id').put(isAuthenticated, updateCartItem)
router.route('/:id').delete(isAuthenticated, deleteCartItem)
router.route('/clear').delete(isAuthenticated, clearCart)

module.exports= router;