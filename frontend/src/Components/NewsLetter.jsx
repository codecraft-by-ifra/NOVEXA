import React from 'react'

export default function NewsLetter() {
  return (
    <div className='flex flex-col items-center justify-center gap-4 md:gap-5 text-center bg-gradient-to-br from-pink-50 via-rose-50 to-white px-6 py-14 md:py-20 rounded-3xl mx-4 md:mx-10 my-10'>
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 max-w-xl">
            Get Exclusive Offers On Your Email
        </h1>
        <p className="text-gray-500 text-sm md:text-base font-medium">
            Subscribe to our newsletter and stay updated
        </p>
        <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden mt-4 w-full max-w-md">
            <input
                type='email'
                placeholder='Enter Your Email'
                className="flex-1 px-5 py-3 md:py-4 text-sm md:text-base text-gray-700 outline-none bg-transparent"
            ></input>
            <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs md:text-sm font-bold tracking-wide px-6 md:px-8 py-3 md:py-4 rounded-full m-1 cursor-pointer hover:scale-105 transition-transform duration-300">
                SUBSCRIBE
            </button>
        </div>
    </div>
  )
}