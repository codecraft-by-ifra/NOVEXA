const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const { addToCart, removeFromCart, getCart } = require("../controllers/cartController");

router.post("/addtocart", fetchUser, addToCart);
router.post("/removefromcart", fetchUser, removeFromCart);
router.get("/getcart", fetchUser, getCart);

module.exports = router;