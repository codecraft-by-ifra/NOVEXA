import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext';
import dropdown from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item';
import { Link } from 'react-router-dom';

export default function ShopCatagory(props) {
  const { all_product } = useContext(ShopContext);
  return (
    <div className="flex flex-col items-center gap-6 pb-12">
      <img src={props.banner} alt='' className="w-full object-cover max-h-[480px]"></img>
      <div className="flex items-center justify-between w-full px-4 md:px-16 mt-6">
        <p className="text-gray-500 text-sm md:text-base m-0">
          <span className="text-gray-800 font-semibold">Showing 1-12</span> out of 36 products
        </p>
        <div className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 cursor-pointer hover:border-gray-400 transition-colors">
          <span className="text-gray-700 text-sm md:text-base font-medium">Sort by</span>
          <img src={dropdown} alt='' className="w-3 md:w-4"></img>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-4 w-full px-4 md:px-16">
        {all_product.map((item, i) => {
          if (props.category.toLowerCase() === item.category.toLowerCase()) {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          }
          else {
            return null;
          }
        })}
      </div>
      <Link  to ={'/Men'} className="w-40 md:w-48 h-11 md:h-12 flex items-center justify-center rounded-full border-2 border-red-400 text-red-500 text-sm md:text-base font-semibold cursor-pointer hover:bg-red-500 hover:text-white transition-colors duration-300 mx-auto mt-8">
        Explore More
      </Link>
    </div>
  )
}