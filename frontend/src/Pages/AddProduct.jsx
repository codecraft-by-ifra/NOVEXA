import React, { useState } from 'react';

export default function AddProduct() {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        category: "men",
        new_price: "",
        old_price: "",
        quantity: "",
    });

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const addProduct = async () => {
        if (!image) {
            alert("Please select an image");
            return;
        }

        try {
            const adminToken = localStorage.getItem("admin-token");

            let formData = new FormData();
            formData.append("product", image);

            const uploadResponse = await fetch(API_URL + "/upload", {
                method: "POST",
                body: formData,
            });

            const uploadData = await uploadResponse.json();

            if (!uploadData.success) {
                alert("Image upload failed");
                return;
            }

            const product = {
                ...productDetails,
                image: uploadData.image_url,
            };

            const response = await fetch(API_URL + "/addproduct", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "admin-token": adminToken,
                },
                body: JSON.stringify(product),
            });

            const data = await response.json();

            if (data.success) {
                alert("Product added successfully!");
                setProductDetails({ name: "", category: "men", new_price: "", old_price: "", quantity: "" });
                setImage(null);
            } else {
                alert(data.error || "Something went wrong");
            }
        } catch (error) {
            console.log("Add product error:", error);
            alert("Something went wrong. Try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[90vh] bg-gradient-to-br from-pink-50 via-rose-50 to-white px-4 py-12">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-pink-100 p-8 md:p-10 flex flex-col gap-5">

                <h1 className="text-2xl font-bold text-gray-900 text-center">Add Product</h1>

                <input
                    name="name"
                    value={productDetails.name}
                    onChange={changeHandler}
                    type="text"
                    placeholder="Product Name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-red-400"
                />

                <div className="flex gap-4">
                    <input
                        name="old_price"
                        value={productDetails.old_price}
                        onChange={changeHandler}
                        type="number"
                        placeholder="Old Price"
                        className="w-1/2 px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-red-400"
                    />
                    <input
                        name="new_price"
                        value={productDetails.new_price}
                        onChange={changeHandler}
                        type="number"
                        placeholder="New Price"
                        className="w-1/2 px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-red-400"
                    />
                </div>

                <select
                    name="category"
                    value={productDetails.category}
                    onChange={changeHandler}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-red-400"
                >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kid">Kid</option>
                </select>

                <input
                    name="quantity"
                    value={productDetails.quantity}
                    onChange={changeHandler}
                    type="number"
                    placeholder="Stock Quantity"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-red-400"
                />

                <input
                    type="file"
                    onChange={imageHandler}
                    accept="image/*"
                    className="w-full text-sm text-gray-600"
                />

                <button
                    onClick={addProduct}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold cursor-pointer hover:scale-[1.02] transition-all"
                >
                    Add Product
                </button>
            </div>
        </div>
    );
}