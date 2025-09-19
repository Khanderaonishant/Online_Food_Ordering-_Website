const express = require("express");
const router = express.Router();
const { placeOrder, getOrders } = require("../controllers/orderController");

router.post("/", placeOrder);
router.get("/:user_id", getOrders);

module.exports = router;
