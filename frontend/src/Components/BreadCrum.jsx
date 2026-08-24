import React from 'react'
import arrow from './Assets/breadcrum_arrow.png'

export default function BreadCrum(props) {
    const { Product } = props;
  return (
    <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm font-medium">
      <span className="hover:text-gray-800 cursor-pointer transition-colors">HOME</span>
      <img src={arrow} alt='' className="w-1 md:w-2"></img>
      <span className="hover:text-gray-800 cursor-pointer transition-colors">SHOP</span>
      <img src={arrow} alt='' className="w-1 md:w-2"></img>
      <span className="hover:text-gray-800 cursor-pointer transition-colors">{Product.category}</span>
      <img src={arrow} alt='' className="w-1 md:w-2"></img>
      <span className="text-gray-800 font-semibold">{Product.name}</span>
    </div>
  )
}