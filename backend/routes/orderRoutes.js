const express = require("express");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const { createOrder, getUserOrders } = require("../controllers/orderController");
const router = express.Router()

router.route("/create").post(isAuthenticated,createOrder);
router.route("/user").get(isAuthenticated,getUserOrders);

module.exports = router;