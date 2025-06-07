const express = require('express');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const { createCheckoutSession, webhookCall } = require('../controllers/paymentController');
const router = express.Router();

router.route('/create-checkout-session').post(isAuthenticated, createCheckoutSession)
router.route('/webhook').post(webhookCall)

module.exports = router;