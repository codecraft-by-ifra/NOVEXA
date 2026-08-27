const validateReview = (req, res, next) => {
    const { rating, comment } = req.body;

    if (rating === undefined || isNaN(rating) || Number(rating) < 1 || Number(rating) > 5) {
        return res.status(400).json({
            success: false,
            error: "Rating must be a number between 1 and 5",
        });
    }

    if (!comment || comment.trim().length < 5) {
        return res.status(400).json({
            success: false,
            error: "Comment must be at least 5 characters long",
        });
    }

    next();
};

module.exports = { validateReview };