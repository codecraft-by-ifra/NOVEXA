const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const {
    addToWishlist,
    removeFromWishlist,
    getWishlist,
} = require("../controllers/wishlistController");

router.post("/addtowishlist", fetchUser, addToWishlist);
router.post("/removefromwishlist", fetchUser, removeFromWishlist);
router.get("/getwishlist", fetchUser, getWishlist);

module.exports = router;