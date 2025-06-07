const express = require("express");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const { createOrder } = require("../controllers/orderController");
const router = express.Router()

router.route("/create").post(isAuthenticated,createOrder)

module.exports = router;