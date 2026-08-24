import React, { useContext } from 'react'
import Item from './Item'
import { ShopContext } from '../Context/ShopContext'

export default function RelatedProduct() {
  const { all_product } = useContext(ShopContext);
  
  const randomProducts = [...all_product]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
  return (
    <div className="flex flex-col items-center gap-4 py-12 px-4 md:px-16">
      <h1 className="text-2xl md:text-4xl font-semibold text-gray-800">Related Products</h1>
      <hr className="w-24 h-1 bg-red-600 rounded-full border-none" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-8 w-full">
        {randomProducts.slice(0,4).map((item, i)=>{
            return <Item  key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}