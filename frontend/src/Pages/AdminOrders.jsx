import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';


const STATUS_OPTIONS = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = () => {
        const token = localStorage.getItem("admin-token");
        fetch(API_URL + "/admin/orders", {
            headers: { "admin-token": token },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setOrders(data.orders);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        const token = localStorage.getItem("admin-token");
        try {
            const response = await fetch(`${API_URL}/admin/orders/${orderId}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "admin-token": token,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await response.json();

            if (data.success) {
                setOrders((prev) =>
                    prev.map((order) =>
                        order._id === orderId ? { ...order, status: newStatus } : order
                    )
                );
            } else {
                alert(data.error || "Failed to update status");
            }
        } catch (error) {
            alert("Something went wrong. Try again.");
        }
    };

    if (loading) {
        return <div className="px-4 md:px-16 py-8">Loading orders...</div>;
    }

    if (orders.length === 0) {
        return <div className="px-4 md:px-16 py-8">No orders yet.</div>;
    }

    return (
        <div className="flex flex-col gap-6 px-4 md:px-16 py-8">
            <h1 className="text-2xl font-bold text-gray-900">All Orders</h1>

            <div className="flex flex-col gap-4">
                {orders.map((order) => (
                    <div key={order._id} className="border border-gray-200 rounded-xl p-4">
                        <div className="flex justify-between items-start flex-wrap gap-3">
                            <div>
                                <p className="text-sm text-gray-500">
                                    {new Date(order.date).toLocaleDateString()} — Order ID: {order._id}
                                </p>
                                <p className="text-sm text-gray-700 mt-1">
                                    {order.address.name} · {order.address.phone}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {order.address.street}, {order.address.city}
                                </p>
                            </div>

                            <select
                                value={order.status}
                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer"
                            >
                                {STATUS_OPTIONS.map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mt-3 flex flex-col gap-1">
                            {order.items.map((item, i) => (
                                <div key={i} className="flex justify-between text-sm text-gray-700">
                                    <span>{item.name} × {item.quantity}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between font-semibold text-gray-900">
                            <span>Total</span>
                            <span>${order.amount}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}