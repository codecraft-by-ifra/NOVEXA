import React from 'react'
import { Link } from 'react-router-dom';

export default function Item(props) {
    return (
        <div>
            <div className='flex flex-col gap-2 w-full max-w-[250px] cursor-pointer group'>
                <div className="overflow-hidden rounded-lg">
                    <Link to={`/product/${props.id}`}><img
                        src={props.image} alt="" onClick={() => window.scrollTo(0, 0)}
                        className="w-full h-[300px] md:h-[350px] object-cover object-top rounded-lg transition-transform duration-300 group-hover:scale-110"
                    /></Link>
                </div>
                <p className="text-gray-700 text-sm md:text-base font-medium m-0 transition-colors duration-300 group-hover:text-red-500">
                    {props.name}
                </p>
                <div className="flex items-center gap-3">
                    <div className="text-red-600 font-semibold text-base md:text-lg">
                        ${props.new_price}
                    </div>
                    <div className="text-gray-400 line-through text-sm md:text-base">
                        ${props.old_price}
                    </div>
                </div>
            </div>
        </div>
    )
}