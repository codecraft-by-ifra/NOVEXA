const reviewService = require("../services/reviewService");
const User = require("../models/User");

const addReview = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        const { productId, rating, comment } = req.body;

        const review = await reviewService.addOrUpdateReview(
            req.user.id,
            user.name,
            productId,
            rating,
            comment
        );

        res.json({ success: true, review });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getReviews = async (req, res) => {
    try {
        const data = await reviewService.getReviewsForProduct(Number(req.params.productId));
        res.json({ success: true, ...data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { addReview, getReviews };