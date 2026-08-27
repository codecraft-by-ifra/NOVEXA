const User = require("../models/User");
const Product = require("../models/Product");

const addItem = async (userId, itemId) => {
    const product = await Product.findOne({ id: itemId });

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    const userData = await User.findOne({ _id: userId });

    if (userData.wishlist.includes(itemId)) {
        return userData.wishlist;
    }

    userData.wishlist.push(itemId);
    await userData.save();

    return userData.wishlist;
};

const removeItem = async (userId, itemId) => {
    const userData = await User.findOne({ _id: userId });

    userData.wishlist = userData.wishlist.filter((id) => id !== itemId);
    await userData.save();

    return userData.wishlist;
};

const getWishlist = async (userId) => {
    const userData = await User.findOne({ _id: userId });
    const products = await Product.find({ id: { $in: userData.wishlist } });
    return products;
};

module.exports = { addItem, removeItem, getWishlist };