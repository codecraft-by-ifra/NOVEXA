import React from 'react'
import Exclusive_image from './Assets/image.png'
import { Link } from 'react-router-dom'

export default function Offers() {
  return (
    <div className='relative flex items-center justify-between bg-gradient-to-br from-pink-100 via-rose-50 to-white px-8 md:px-20 py-14 md:py-0 h-auto md:h-[77vh] flex-col-reverse md:flex-row rounded-3xl mx-4 md:mx-10 my-10 overflow-hidden'>

        <div className="absolute -top-16 -left-16 w-56 h-56 bg-orange-300 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-10 right-1/4 w-48 h-48 bg-red-200 rounded-full opacity-40 blur-3xl"></div>
        <div className="absolute top-10 right-10 w-3 h-3 bg-red-400 rounded-full hidden md:block"></div>
        <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-orange-400 rounded-full hidden md:block"></div>

        <div className="flex-1 flex flex-col gap-3 md:gap-4 text-center md:text-left z-10 mt-8 md:mt-0">
            <span className="text-red-500 text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                Limited Time
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight m-0">
                Exclusive
            </h1>
            <h1 className="text-4xl md:text-6xl font-extrabold m-0">
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                    Offers For You
                </span>
            </h1>
            <p className="text-gray-500 text-sm md:text-base font-medium mt-2 max-w-md mx-auto md:mx-0">
                Only on best sellers products — grab your favorites before they're gone.
            </p>
           <Link to={'/Kids'}> <button className="mt-5 md:mt-8 w-44 md:w-52 h-12 md:h-14 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm md:text-base font-bold cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-red-300 transition-all duration-300 mx-auto md:mx-0">
                Check Now →
            </button></Link>
        </div>

        <div className="flex-1 flex items-center justify-center z-10">
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-orange-300/40 to-transparent rounded-full blur-2xl"></div>
                <img
                    src={Exclusive_image}
                    alt=''
                    className="relative w-full max-w-[260px] md:max-w-[380px] object-contain drop-shadow-2xl "
                ></img>
            </div>
        </div>
    </div>
  )
}