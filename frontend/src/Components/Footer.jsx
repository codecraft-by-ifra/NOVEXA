import React from 'react'
import footer_logo from './Assets/logo_big.png'
import instagram from './Assets/instagram_icon.png'
import whatsapp from './Assets/whatsapp_icon.png'
import printest from './Assets/printest_icon.png'

export default function Footer() {
    return (
        <div className="relative bg-gray-900 px-6 md:px-20 pt-16 pb-8 mt-10 overflow-hidden">

            <div className="absolute -top-24 left-1/4 w-72 h-72 bg-red-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute -bottom-24 right-1/4 w-72 h-72 bg-orange-500 rounded-full opacity-10 blur-3xl"></div>

            <div className="relative flex flex-col md:flex-row items-start justify-between gap-10 md:gap-6 pb-10 border-b border-gray-700">

                <div className="flex flex-col gap-4 max-w-xs">
                    <div className="flex items-center">
                        <img src={footer_logo} alt="" className="w-15 md:w-20" />
                        <p className="text-white font-bold text-xl md:text-2xl tracking-wide m-0">SHOPPER</p>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed m-0">
                        Curated fashion for every mood. Quality pieces, honest prices, delivered to your door.
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 cursor-pointer hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 transition-all duration-300">
                            <img src={instagram} alt='' className="w-4"></img>
                        </div>
                        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 cursor-pointer hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 transition-all duration-300">
                            <img src={printest} alt='' className="w-4"></img>
                        </div>
                        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 cursor-pointer hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 transition-all duration-300">
                            <img src={whatsapp} alt='' className="w-4"></img>
                        </div>
                    </div>
                </div>

                <div className="flex gap-12 md:gap-20">
                    <ul className="flex flex-col gap-3 list-none p-0 m-0">
                        <li className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Shop</li>
                        <li className="text-gray-300 text-sm cursor-pointer hover:text-white transition-colors">Products</li>
                        <li className="text-gray-300 text-sm cursor-pointer hover:text-white transition-colors">Offices</li>
                        <li className="text-gray-300 text-sm cursor-pointer hover:text-white transition-colors">Company</li>
                    </ul>
                    <ul className="flex flex-col gap-3 list-none p-0 m-0">
                        <li className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Help</li>
                        <li className="text-gray-300 text-sm cursor-pointer hover:text-white transition-colors">About</li>
                        <li className="text-gray-300 text-sm cursor-pointer hover:text-white transition-colors">Contact</li>
                    </ul>
                </div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-3 pt-6">
                <p className="text-gray-500 text-xs md:text-sm m-0">Copyright © 2023 Shopper — All Rights Reserved</p>
                <p className="text-gray-600 text-xs m-0">Made with care, worn with confidence.</p>
            </div>
        </div>
    )
}