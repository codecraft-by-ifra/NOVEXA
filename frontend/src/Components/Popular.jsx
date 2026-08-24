import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Item from './Item'

export default function Popular() {
  const { all_product } = useContext(ShopContext);

  const popular_in_women = all_product
    .filter((item) => item.category === "women")
    .slice(2, 6);

  return (
    <div className='flex flex-col items-center gap-4 py-12 px-4 md:px-16'>
      <h1 className="text-2xl md:text-4xl font-semibold text-gray-800">Popular In Womans</h1>
      <hr className="w-24 h-1 bg-red-600 rounded-full border-none" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-8 w-full">
        {popular_in_women.map((item, i) => {
          return (
          <Item  key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />  
          )
        })}
      </div>
    </div>
  )
}