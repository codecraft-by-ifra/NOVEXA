import React, { useContext, useState } from 'react'
import star_icon from './Assets/star_icon.png'
import star_dull from './Assets/star_dull_icon.png'
import { ShopContext } from '../Context/ShopContext';

export default function ProductDisplay(props) {
    const { Product } = props;
    const [selectedSize, setSelectedSize] = useState(null);
    const { addToCart, cartitems } = useContext(ShopContext);

    const qtyInCart = cartitems[Product.id] || 0;
    const isOutOfStock = qtyInCart >= Product.quantity;

    return (
        <div className="flex flex-col md:flex-row gap-8 md:gap-14 py-8">

            <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-5 flex-1">
                <div className='flex md:flex-col gap-3 md:gap-4'>
                    <img src={Product.image} alt='' className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border border-gray-200 cursor-pointer hover:border-red-400 transition-colors"></img>
                    <img src={Product.image} alt='' className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border border-gray-200 cursor-pointer hover:border-red-400 transition-colors"></img>
                    <img src={Product.image} alt='' className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border border-gray-200 cursor-pointer hover:border-red-400 transition-colors"></img>
                    <img src={Product.image} alt='' className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border border-gray-200 cursor-pointer hover:border-red-400 transition-colors"></img>
                </div>
                <div className="flex-1 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
                    <img src={Product.image} alt='' className="w-full h-full max-h-[500px] object-contain"></img>
                </div>
            </div>

            <div className="flex flex-col gap-4 flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 m-0">{Product.name}</h1>

                <div className="flex items-center gap-2">
                    <img src={star_icon} alt='' className="w-4 md:w-5"></img>
                    <img src={star_icon} alt='' className="w-4 md:w-5"></img>
                    <img src={star_icon} alt='' className="w-4 md:w-5"></img>
                    <img src={star_icon} alt='' className="w-4 md:w-5"></img>
                    <img src={star_dull} alt='' className="w-4 md:w-5"></img>
                    <p className="text-gray-400 text-sm m-0">(122)</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-gray-400 line-through text-base md:text-lg">${Product.old_price}</div>
                    <div className="text-red-600 font-bold text-2xl md:text-3xl">${Product.new_price}</div>
                </div>

                <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg">
                    A timeless design meets everyday comfort — crafted with quality fabric and a fit that works for any occasion.
                </p>

                <div className="flex flex-col gap-3 mt-2">
                    <h2 className="text-gray-700 font-semibold text-sm md:text-base m-0">Select Size</h2>
                    <div className="flex items-center gap-3">
                        {["S", "M", "L", "XL", "XXL"].map((size) => (
                            <div
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg border text-sm md:text-base font-medium cursor-pointer transition-all
                                ${selectedSize === size
                                        ? "bg-gray-900 text-white border-gray-900"
                                        : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-400"
                                    }`}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>

                {isOutOfStock ? (
                    <button
                        disabled
                        className="mt-4 w-52 md:w-60 h-12 md:h-14 rounded-full bg-gray-300 text-gray-600 text-sm md:text-base font-bold cursor-not-allowed"
                    >
                        Out of Stock
                    </button>
                ) : (
                    <button
                        onClick={() => { addToCart(Product.id) }}
                        className="mt-4 w-52 md:w-60 h-12 md:h-14 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm md:text-base font-bold cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-red-200 transition-all duration-300"
                    >
                        Add To Cart
                    </button>
                )}

                <div className="flex flex-col gap-1 mt-4 pt-4 border-t border-gray-100">
                    <p className="text-gray-500 text-xs md:text-sm m-0">
                        <span className="text-gray-700 font-semibold">Category: </span>Women, T-Shirts, Crop Top
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm m-0">
                        <span className="text-gray-700 font-semibold">Tags: </span>Latest, Modern
                    </p>
                </div>
            </div>
        </div>
    )
}