const cartService = require("../services/cartService");

const addToCart = async (req, res) => {
    try {
        await cartService.addItem(req.user.id, req.body.itemId);
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message,
            ...(error.outOfStock && { outOfStock: true }),
        });
    }
};

const removeFromCart = async (req, res) => {
    try {
        await cartService.removeItem(req.user.id, req.body.itemId);
        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, error: error.message });
    }
};

const getCart = async (req, res) => {
    try {
        const cartData = await cartService.getCart(req.user.id);
        res.json(cartData);
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, error: error.message });
    }
};

module.exports = { addToCart, removeFromCart, getCart };