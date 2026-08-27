const Review = require("../models/Review");

const addOrUpdateReview = async (userId, userName, productId, rating, comment) => {
    const existingReview = await Review.findOne({ productId, userId });

    if (existingReview) {
        existingReview.rating = rating;
        existingReview.comment = comment;
        existingReview.date = Date.now();
        await existingReview.save();
        return existingReview;
    }

    const review = new Review({ productId, userId, userName, rating, comment });
    await review.save();
    return review;
};

const getReviewsForProduct = async (productId) => {
    const reviews = await Review.find({ productId }).sort({ date: -1 });

    const averageRating =
        reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;

    return {
        reviews,
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews: reviews.length,
    };
};

module.exports = { addOrUpdateReview, getReviewsForProduct };