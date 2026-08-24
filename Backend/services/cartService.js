const Product = require("../models/Product");
const User = require("../models/User");

const addItem = async (userId, itemId) => {
    const product = await Product.findOne({ id: itemId });

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    let userData = await User.findOne({ _id: userId });
    const currentQtyInCart = userData.cartData[itemId] || 0;

    if (currentQtyInCart + 1 > product.quantity) {
        const error = new Error("This product is out of stock");
        error.statusCode = 400;
        error.outOfStock = true;
        throw error;
    }

    userData.cartData[itemId] = currentQtyInCart + 1;
    await User.findOneAndUpdate(
        { _id: userId },
        { cartData: userData.cartData }
    );
};

const removeItem = async (userId, itemId) => {
    let userData = await User.findOne({ _id: userId });
    if (userData.cartData[itemId] > 0) {
        userData.cartData[itemId] -= 1;
    }
    await User.findOneAndUpdate(
        { _id: userId },
        { cartData: userData.cartData }
    );
};

const getCart = async (userId) => {
    let userData = await User.findOne({ _id: userId });
    return userData.cartData;
};

module.exports = { addItem, removeItem, getCart };