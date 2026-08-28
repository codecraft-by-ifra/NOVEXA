import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';


export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = () => {
        const token = localStorage.getItem("auth-token");
        if (!token) {
            setLoading(false);
            return;
        }

        fetch(API_URL + "/myorders", {
            headers: { "auth-token": token },
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

    const cancelOrder = async (orderId) => {
        const confirmed = window.confirm("Are you sure you want to cancel this order?");
        if (!confirmed) return;

        const token = localStorage.getItem("auth-token");
        try {
            const response = await fetch(`${API_URL}/cancelorder/${orderId}`, {
                method: "PUT",
                headers: { "auth-token": token },
            });

            const data = await response.json();

            if (data.success) {
                setOrders((prev) =>
                    prev.map((order) =>
                        order._id === orderId ? { ...order, status: "Cancelled" } : order
                    )
                );
            } else {
                alert(data.error || "Failed to cancel order");
            }
        } catch (error) {
            alert("Something went wrong. Try again.");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const statusColor = (status) => {
        switch (status) {
            case "Delivered": return "bg-green-100 text-green-700";
            case "Shipped": return "bg-blue-100 text-blue-700";
            case "Cancelled": return "bg-red-100 text-red-700";
            case "Processing": return "bg-yellow-100 text-yellow-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    if (loading) {
        return <div className="px-4 md:px-16 py-8">Loading your orders...</div>;
    }

    if (!localStorage.getItem("auth-token")) {
        return <div className="px-4 md:px-16 py-8">Please login to see your orders.</div>;
    }

    if (orders.length === 0) {
        return <div className="px-4 md:px-16 py-8">You haven't placed any orders yet.</div>;
    }

    return (
        <div className="flex flex-col gap-6 px-4 md:px-16 py-8">
            <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>

            <div className="flex flex-col gap-4">
                {orders.map((order) => (
                    <div key={order._id} className="border border-gray-200 rounded-xl p-4">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Order placed on {new Date(order.date).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(order.status)}`}>
                                    {order.status}
                                </span>
                                {order.status === "Pending" && (
                                    <button
                                        onClick={() => cancelOrder(order._id)}
                                        className="px-3 py-1 rounded-full border border-red-300 text-red-600 text-xs font-medium cursor-pointer hover:bg-red-50"
                                    >
                                        Cancel Order
                                    </button>
                                )}
                            </div>
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