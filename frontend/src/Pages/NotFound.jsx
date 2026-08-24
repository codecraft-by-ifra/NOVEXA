import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-[70vh] px-6 text-center">
        <h1 className="text-7xl md:text-9xl font-extrabold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent m-0">
            404
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 m-0">
            Page Not Found
        </h2>
        <p className="text-gray-500 text-sm md:text-base max-w-sm m-0">
            The page you're looking for doesn't exist or may have been moved.
        </p>
        <Link to={'/'}>
            <button className="mt-4 w-44 md:w-52 h-12 md:h-14 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm md:text-base font-bold cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-red-200 transition-all duration-300">
                Back To Home
            </button>
        </Link>
    </div>
  )
}