const Order = require("../models/orders");
const User = require("../models/User");
const Product = require("../models/Product");

const ALLOWED_STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const createOrder = async (userId, { items, amount, address }) => {
    for (const item of items) {
        const product = await Product.findOne({ id: item.productId });
        if (!product || product.quantity < item.quantity) {
            const error = new Error(`${item.name || "Product"} is out of stock`);
            error.statusCode = 400;
            throw error;
        }
    }

    const order = new Order({
        userId: userId,
        items: items,
        amount: amount,
        address: address,
    });

    await order.save();

    for (const item of items) {
        const product = await Product.findOne({ id: item.productId });
        product.quantity -= item.quantity;
        product.available = product.quantity > 0;
        await product.save();
    }

    await User.findOneAndUpdate(
        { _id: userId },
        { cartData: {} }
    );

    return order;
};

const getOrdersByUser = async (userId) => {
    return await Order.find({ userId }).sort({ date: -1 });
};

const getAllOrders = async () => {
    return await Order.find({}).sort({ date: -1 });
};

const updateStatus = async (orderId, status) => {
    if (!ALLOWED_STATUSES.includes(status)) {
        const error = new Error(`Status must be one of: ${ALLOWED_STATUSES.join(", ")}`);
        error.statusCode = 400;
        throw error;
    }

    const order = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
    );

    if (!order) {
        const error = new Error("Order not found");
        error.statusCode = 404;
        throw error;
    }

    return order;
};

module.exports = { createOrder, getOrdersByUser, getAllOrders, updateStatus };