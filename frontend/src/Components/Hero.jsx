import React from 'react'
import { Link } from 'react-router-dom'
import hand_icon from  '../Components/Assets/hand_icon.png'
import arrow_icon from  '../Components/Assets/arrow.png'
import hero_image from  '../Components/Assets/hero_image.png'

export default function Hero() {
  return (
    <div className='flex items-center justify-between bg-[#fde8e4] px-6 md:px-16 py-10 md:py-0 h-auto md:h-[85vh] flex-col md:flex-row'>
        <div className="flex-1 flex flex-col gap-4 md:gap-5 text-center md:text-left">
            <h2 className="text-gray-700 font-semibold text-lg md:text-2xl tracking-wide">
                NEW ARRIVALS ONLY
            </h2>
            <div className='flex items-center gap-3 md:gap-5 justify-center md:justify-start'>
                <p className="text-4xl md:text-6xl font-bold text-gray-800 m-0">New</p>
                <img src={hand_icon} alt='hand-icon' className="w-10 md:w-16"></img>
            </div>
            <p className="text-4xl md:text-6xl font-bold text-gray-800 m-0">Collections</p>
            <p className="text-4xl md:text-6xl font-bold text-gray-800 m-0">for Everyone</p>

            <Link to={'/Woman'} className="flex items-center gap-3 md:gap-4 bg-red-600 text-white rounded-full px-6 py-3 md:px-8 md:py-4 w-fit mx-auto md:mx-0 cursor-pointer hover:bg-red-700 transition-colors">
                <button className="font-semibold text-sm md:text-lg">Latest Collection</button>
                <img src={arrow_icon} alt='' className="w-4 md:w-6"></img>
            </Link>
        </div>
        <div className="flex-1 flex items-center justify-center mt-8 md:mt-0">
            <img src={hero_image} alt='' className="w-full scale-125"></img>
        </div>
    </div>
  )
}