import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext'
import remove_icon from './Assets/cart_cross_icon.png'


export default function CartItems() {
    const navigate = useNavigate();
    const { all_product, cartitems, removeToCart, addToCart } = useContext(ShopContext)

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
    }

    const hasItems = Object.values(cartitems).some((qty) => qty > 0);

    return (
        <div className="flex flex-col gap-4 px-4 md:px-16 py-8">
            <div className="grid grid-cols-6 items-center gap-4 text-gray-400 text-xs md:text-sm font-semibold uppercase tracking-wide">
                <p className="m-0">Products</p>
                <p className="m-0">Title</p>
                <p className="m-0">Price</p>
                <p className="m-0">Quantity</p>
                <p className="m-0">Total</p>
                <p className="m-0">Remove</p>
            </div>
            <hr className="border-gray-200" />

            {!hasItems && (
                <div className="flex flex-col items-center justify-center gap-2 py-16">
                    <span className="text-4xl">🛒</span>
                    <p className="text-gray-500 text-sm md:text-base m-0">Your cart is empty</p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-2 px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 text-sm font-semibold cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        Continue Shopping
                    </button>
                </div>
            )}

            {all_product.map((e) => {
                if (cartitems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="grid grid-cols-6 items-center gap-4 py-3 hover:bg-gray-50/60 rounded-xl transition-colors">
                                <img src={e.image} alt='' className="w-14 h-14 md:w-16 md:h-16 object-cover object-top rounded-lg"></img>
                                <p className="text-gray-700 text-sm md:text-base m-0">{e.name}</p>
                                <p className="text-gray-700 text-sm md:text-base m-0">${e.new_price}</p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => removeToCart(e.id)}
                                        className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 text-sm font-bold cursor-pointer hover:bg-gray-100 transition-colors"
                                    >
                                        −
                                    </button>
                                    <span className="w-6 text-center text-sm md:text-base font-medium text-gray-800">
                                        {cartitems[e.id]}
                                    </span>
                                    <button
                                        onClick={() => addToCart(e.id)}
                                        className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 text-sm font-bold cursor-pointer hover:bg-gray-100 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="text-gray-900 font-semibold text-sm md:text-base m-0">${e.new_price * cartitems[e.id]}</p>
                                <img
                                    src={remove_icon}
                                    onClick={() => { removeToCart(e.id) }}
                                    alt=''
                                    className="w-20 md:w-23 cursor-pointer hover:scale-110 transition-transform"
                                ></img>
                            </div>
                            <hr className="border-gray-100" />
                        </div>
                    )
                }
                return null;
            })}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-12 w-full">
                <div className="flex flex-col gap-5 w-full bg-gradient-to-br from-orange-50 via-rose-50 to-pink-50 rounded-2xl p-6 border border-orange-100">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 m-0">Cart Totals</h1>
                    <div className="flex flex-col gap-3 bg-white/70 rounded-xl px-4 py-3">
                        <div className="flex items-center justify-between">
                            <p className="text-gray-500 text-sm md:text-base m-0">Subtotal</p>
                            <p className="text-gray-800 text-sm md:text-base font-medium m-0">${getTotalCartAmount()}</p>
                        </div>
                        <hr className="border-gray-200" />
                        <div className="flex items-center justify-between">
                            <p className="text-gray-500 text-sm md:text-base m-0">Shipping Fee</p>
                            <p className="text-green-600 text-sm md:text-base font-medium m-0">Free</p>
                        </div>
                        <hr className="border-gray-200" />
                        <div className="flex items-center justify-between">
                            <h3 className="text-gray-900 text-base md:text-lg font-bold m-0">Total</h3>
                            <p className="text-gray-900 text-base md:text-lg font-bold m-0">${getTotalCartAmount()}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/checkout')}
                        className="mt-4 w-full h-12 md:h-14 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm md:text-base font-bold cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-red-200 transition-all duration-300"
                    >
                        Proceed To Checkout
                    </button>
                </div>

                
                <div className="flex flex-col gap-5 w-full bg-gradient-to-br from-orange-50 via-rose-50 to-pink-50 rounded-2xl p-6 border border-orange-100">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">✨</span>
                        <h3 className="text-gray-900 font-bold text-sm md:text-base m-0">Why shop with us</h3>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 bg-white/70 rounded-xl px-4 py-3">
                            <span className="w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-sm text-xl shrink-0">
                                🚚
                            </span>
                            <div>
                                <p className="text-gray-900 font-semibold text-sm md:text-base m-0">
                                    Fast Delivery
                                </p>
                                <p className="text-gray-500 text-xs md:text-sm mt-0.5 m-0">
                                    Arrives in 3–5 business days
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-white/70 rounded-xl px-4 py-3">
                            <span className="w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-sm text-xl shrink-0">
                                ↩️
                            </span>
                            <div>
                                <p className="text-gray-900 font-semibold text-sm md:text-base m-0">
                                    Easy Returns
                                </p>
                                <p className="text-gray-500 text-xs md:text-sm mt-0.5 m-0">
                                    30-day hassle-free returns
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-white/70 rounded-xl px-4 py-3">
                            <span className="w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-sm text-xl shrink-0">
                                🔒
                            </span>
                            <div>
                                <p className="text-gray-900 font-semibold text-sm md:text-base m-0">
                                    Secure Checkout
                                </p>
                                <p className="text-gray-500 text-xs md:text-sm mt-0.5 m-0">
                                    Your data is always protected
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}