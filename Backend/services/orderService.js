const Order = require("../models/orders");
const User = require("../models/User");
const Product = require("../models/Product");
const emailService = require("./emailService");

const ALLOWED_STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
const TERMINAL_STATUSES = ["Cancelled", "Delivered"];

const restoreStockForOrder = async (order) => {
    for (const item of order.items) {
        const restoredProduct = await Product.findOneAndUpdate(
            { id: item.productId },
            { $inc: { quantity: item.quantity } },
            { new: true }
        );

        if (restoredProduct && restoredProduct.quantity > 0 && !restoredProduct.available) {
            restoredProduct.available = true;
            await restoredProduct.save();
        }
    }
};

const createOrder = async (userId, { items, amount, address }) => {
    const decrementedItems = [];

    try {
        for (const item of items) {
            const updatedProduct = await Product.findOneAndUpdate(
                { id: item.productId, quantity: { $gte: item.quantity } },
                { $inc: { quantity: -item.quantity } },
                { new: true }
            );

            if (!updatedProduct) {
                const error = new Error(`${item.name || "Product"} is out of stock`);
                error.statusCode = 400;
                throw error;
            }

            if (updatedProduct.quantity <= 0 && updatedProduct.available) {
                updatedProduct.available = false;
                await updatedProduct.save();
            }

            decrementedItems.push(item);
        }

        const order = new Order({ userId: userId, items: items, amount: amount, address: address,});
        await order.save();

        await User.findOneAndUpdate(
            { _id: userId },
            { cartData: {} }
        );

        try {
            const user = await User.findOne({ _id: userId });
            if (user) {
                await emailService.sendOrderConfirmationEmail(user.email, order);
            }
        } catch (emailError) {
            console.log("Order confirmation email failed to send:", emailError.message);
        }

        return order;
    } catch (error) {
        for (const item of decrementedItems) {
            const restoredProduct = await Product.findOneAndUpdate(
                { id: item.productId },
                { $inc: { quantity: item.quantity } },
                { new: true }
            );

            if (restoredProduct && restoredProduct.quantity > 0 && !restoredProduct.available) {
                restoredProduct.available = true;
                await restoredProduct.save();
            }
        }
        throw error;
    }
};

const getOrdersByUser = async (userId) => {
    return await Order.find({ userId }).sort({ date: -1 });
};

const getAllOrders = async () => {
    return await Order.find({}).sort({ date: -1 });
};

const cancelOrder = async (userId, orderId) => {
    const order = await Order.findOne({ _id: orderId, userId: userId });

    if (!order) {
        const error = new Error("Order not found");
        error.statusCode = 404;
        throw error;
    }

    if (order.status !== "Pending") {
        const error = new Error(`Cannot cancel an order that is already "${order.status}"`);
        error.statusCode = 400;
        throw error;
    }

    await restoreStockForOrder(order);

    order.status = "Cancelled";
    await order.save();

    return order;
};

const updateStatus = async (orderId, status) => {
    if (!ALLOWED_STATUSES.includes(status)) {
        const error = new Error(`Status must be one of: ${ALLOWED_STATUSES.join(", ")}`);
        error.statusCode = 400;
        throw error;
    }

    const order = await Order.findById(orderId);

    if (!order) {
        const error = new Error("Order not found");
        error.statusCode = 404;
        throw error;
    }

    if (TERMINAL_STATUSES.includes(order.status)) {
        const error = new Error(`Cannot change status — order is already "${order.status}"`);
        error.statusCode = 400;
        throw error;
    }

    if (status === "Cancelled") {
        await restoreStockForOrder(order);
    }

    order.status = status;
    await order.save();

    return order;
};

module.exports = { createOrder, getOrdersByUser, getAllOrders, updateStatus, cancelOrder };