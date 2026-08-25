import React, { useState } from 'react';

export default function EditProductModal({ product, onClose, onUpdated }) {
    const [details, setDetails] = useState({
        name: product.name,
        category: product.category,
        image: product.image,
        new_price: product.new_price,
        old_price: product.old_price,
        quantity: product.quantity,
    });
    const [saving, setSaving] = useState(false);

    const changeHandler = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const saveChanges = async () => {
        setSaving(true);
        try {
            const adminToken = localStorage.getItem("admin-token");

            const response = await fetch(`http://localhost:4000/admin/products/${product.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "admin-token": adminToken,
                },
                body: JSON.stringify(details),
            });

            const data = await response.json();

            if (data.success) {
                alert("Product updated successfully!");
                onUpdated();
                onClose();
            } else {
                alert(data.error || "Something went wrong");
            }
        } catch (error) {
            alert("Something went wrong. Try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 flex flex-col gap-4">
                <h2 className="text-xl font-bold text-gray-900">Edit Product</h2>

                <input
                    name="name"
                    value={details.name}
                    onChange={changeHandler}
                    type="text"
                    placeholder="Product Name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-red-400"
                />

                <div className="flex gap-4">
                    <input
                        name="old_price"
                        value={details.old_price}
                        onChange={changeHandler}
                        type="number"
                        placeholder="Old Price"
                        className="w-1/2 px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-red-400"
                    />
                    <input
                        name="new_price"
                        value={details.new_price}
                        onChange={changeHandler}
                        type="number"
                        placeholder="New Price"
                        className="w-1/2 px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-red-400"
                    />
                </div>

                <select
                    name="category"
                    value={details.category}
                    onChange={changeHandler}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-red-400"
                >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kid">Kid</option>
                </select>

                <input
                    name="quantity"
                    value={details.quantity}
                    onChange={changeHandler}
                    type="number"
                    placeholder="Stock Quantity"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-red-400"
                />

                <div className="flex gap-3 mt-2">
                    <button
                        onClick={onClose}
                        disabled={saving}
                        className="w-1/2 py-3 rounded-full border border-gray-300 text-gray-700 text-sm font-bold cursor-pointer hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={saveChanges}
                        disabled={saving}
                        className="w-1/2 py-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold cursor-pointer hover:scale-[1.02] transition-all disabled:opacity-60"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}