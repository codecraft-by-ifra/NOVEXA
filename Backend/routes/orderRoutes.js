const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const fetchAdmin = require("../middleware/fetchAdmin");
const { placeOrder, getMyOrders, getAllOrders, updateOrderStatus, cancelOrder} = require("../controllers/orderController");

router.post("/placeorder", fetchUser, placeOrder);
router.get("/myorders", fetchUser, getMyOrders);
router.put("/cancelorder/:id", fetchUser, cancelOrder);
router.get("/admin/orders", fetchAdmin, getAllOrders);
router.put("/admin/orders/:id/status", fetchAdmin, updateOrderStatus);

module.exports = router;