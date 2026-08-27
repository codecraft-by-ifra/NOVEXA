const wishlistService = require("../services/wishlistService");

const addToWishlist = async (req, res) => {
    try {
        const wishlist = await wishlistService.addItem(req.user.id, req.body.itemId);
        res.json({ success: true, wishlist });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, error: error.message });
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        const wishlist = await wishlistService.removeItem(req.user.id, req.body.itemId);
        res.json({ success: true, wishlist });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, error: error.message });
    }
};

const getWishlist = async (req, res) => {
    try {
        const products = await wishlistService.getWishlist(req.user.id);
        res.json({ success: true, products });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, error: error.message });
    }
};

module.exports = { addToWishlist, removeFromWishlist, getWishlist };