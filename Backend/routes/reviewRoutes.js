const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const { addReview, getReviews } = require("../controllers/reviewController");
const { validateReview } = require("../validators/reviewValidator");

router.post("/addreview", fetchUser, validateReview, addReview);
router.get("/reviews/:productId", getReviews);

module.exports = router;