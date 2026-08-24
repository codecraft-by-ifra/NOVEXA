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

            {all_product.map((e) => {
                if (cartitems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="grid grid-cols-6 items-center gap-4 py-2">
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

            <div className="flex flex-col md:flex-row items-start justify-between gap-10 md:gap-20 mt-12 max-w-4xl">
                <div className="flex flex-col gap-5 w-full max-w-sm">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 m-0">Cart Totals</h1>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <p className="text-gray-500 text-sm md:text-base m-0">Subtotal</p>
                            <p className="text-gray-800 text-sm md:text-base font-medium m-0">${getTotalCartAmount()}</p>
                        </div>
                        <hr className="border-gray-100" />
                        <div className="flex items-center justify-between">
                            <p className="text-gray-500 text-sm md:text-base m-0">Shipping Fee</p>
                            <p className="text-gray-800 text-sm md:text-base font-medium m-0">Free</p>
                        </div>
                        <hr className="border-gray-100" />
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

                <div className="flex flex-col gap-4 w-full max-w-sm">
                    <p className="text-gray-500 text-sm m-0">
                        If you have a promo code, enter it here.
                    </p>
                    <div className="flex items-center bg-gray-50 rounded-full overflow-hidden border border-gray-200">
                        <input
                            placeholder='Promo Code'
                            className="flex-1 px-5 py-3 text-sm md:text-base text-gray-700 outline-none bg-transparent"
                        ></input>
                        <button className="bg-gray-900 text-white text-xs md:text-sm font-bold tracking-wide px-6 py-3 m-1 rounded-full cursor-pointer hover:bg-gray-800 transition-colors">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}