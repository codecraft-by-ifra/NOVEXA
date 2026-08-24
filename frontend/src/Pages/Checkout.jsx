import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
    const { all_product, cartitems, fetchCart } = useContext(ShopContext);
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        name: "",
        phone: "",
        street: "",
        city: "",
    });

    const changeHandler = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const getTotalCartAmount = () => {
        let total = 0;
        for (const item in cartitems) {
            if (cartitems[item] > 0) {
                const itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    total += itemInfo.new_price * cartitems[item];
                }
            }
        }
        return total;
    };

    const placeOrder = async () => {
        if (!address.name || !address.phone || !address.street || !address.city) {
            alert("Please fill all address fields");
            return;
        }

        const items = [];
        for (const itemId in cartitems) {
            if (cartitems[itemId] > 0) {
                const itemInfo = all_product.find((product) => product.id === Number(itemId));
                if (itemInfo) {
                    items.push({
                        productId: itemInfo.id,
                        name: itemInfo.name,
                        price: itemInfo.new_price,
                        quantity: cartitems[itemId],
                    });
                }
            }
        }

        const token = localStorage.getItem("auth-token");

        try {
            const response = await fetch("http://localhost:4000/placeorder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
                body: JSON.stringify({
                    items: items,
                    amount: getTotalCartAmount(),
                    address: address,
                }),
            });

            const data = await response.json();

            if (data.success) {
                fetchCart();
                alert("Order placed successfully!");
                navigate('/');
            } else {
                alert(data.error || "Something went wrong");
            }
        } catch (error) {
            console.log("Order error:", error);
            alert("Something went wrong. Try again.");
        }
    };

    return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-pink-50 via-rose-50 to-white px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-pink-100 p-8 md:p-10 flex flex-col gap-6">

            <div className="flex flex-col gap-1 text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 m-0">Delivery Address</h1>
                <p className="text-gray-400 text-sm m-0">Enter your details to place the order</p>
            </div>

            <div className="flex flex-col gap-4">
                <input
                    name="name"
                    value={address.name}
                    onChange={changeHandler}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm md:text-base text-gray-700 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                />
                <input
                    name="phone"
                    value={address.phone}
                    onChange={changeHandler}
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm md:text-base text-gray-700 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                />
                <input
                    name="street"
                    value={address.street}
                    onChange={changeHandler}
                    placeholder="Street Address"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm md:text-base text-gray-700 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                />
                <input
                    name="city"
                    value={address.city}
                    onChange={changeHandler}
                    placeholder="City"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm md:text-base text-gray-700 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                />
            </div>

            <hr className="border-gray-100" />

            <div className="flex items-center justify-between">
                <p className="text-gray-500 text-sm md:text-base m-0">Total Amount</p>
                <p className="text-gray-900 text-lg md:text-xl font-bold m-0">${getTotalCartAmount()}</p>
            </div>

            <button
                onClick={placeOrder}
                className="w-full py-3 md:py-4 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm md:text-base font-bold cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-red-200 transition-all duration-300"
            >
                Place Order
            </button>
        </div>
    </div>
);
}