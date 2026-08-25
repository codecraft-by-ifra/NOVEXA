const orderService = require("../services/orderService");

const placeOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.user.id, req.body);
        res.json({ success: true, orderId: order._id });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, error: error.message });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await orderService.getOrdersByUser(req.user.id);
        res.json({ success: true, orders });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json({ success: true, orders });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, error: error.message });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const order = await orderService.cancelOrder(req.user.id, req.params.id);
        res.json({ success: true, order });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, error: error.message });
    }
};


const updateOrderStatus = async (req, res) => {
    try {
        const order = await orderService.updateStatus(req.params.id, req.body.status);
        res.json({ success: true, order });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, error: error.message });
    }
};

module.exports = { placeOrder, getMyOrders, getAllOrders, updateOrderStatus, cancelOrder };