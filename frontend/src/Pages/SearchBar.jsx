import React, { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Item'

export default function Search() {
  const { all_product } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = all_product.filter((item) => {
    const lowerQuery = query.toLowerCase().trim();
    const lowerCategory = item.category.toLowerCase();
    const lowerName = item.name.toLowerCase();

    if (["men", "man", "women", "woman", "kid", "kids"].includes(lowerQuery)) {
      const normalizedQuery = lowerQuery === "kids" ? "kid" : lowerQuery;
      return lowerCategory === normalizedQuery;
    }

    return lowerName.includes(lowerQuery);
  });

  return (
    <div className="flex flex-col items-center gap-4 py-12 px-4 md:px-16">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center">
        Search results for "{query}"
      </h1>
      <p className="text-gray-400 text-sm md:text-base">{results.length} products found</p>
      <hr className="w-24 h-1 bg-red-600 rounded-full border-none" />

      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-8 w-full">
          {results.map((item, i) => (
            <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm md:text-base mt-8">No products match your search.</p>
      )}
    </div>
  )
}