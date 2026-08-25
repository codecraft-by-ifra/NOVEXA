import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext';
import dropdown from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item';
import { Link } from 'react-router-dom';

export default function ShopCatagory(props) {
  const { all_product } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("");

  const fetchFiltered = () => {
    let url = `http://localhost:4000/allproducts?category=${props.category.toLowerCase()}`;
    if (minPrice) url += `&minPrice=${minPrice}`;
    if (maxPrice) url += `&maxPrice=${maxPrice}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let sorted = [...data];
        if (sortOrder === "lowToHigh") sorted.sort((a, b) => a.new_price - b.new_price);
        if (sortOrder === "highToLow") sorted.sort((a, b) => b.new_price - a.new_price);
        setProducts(sorted);
      });
  };

  useEffect(() => {
    fetchFiltered();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.category, sortOrder]);

  const applyPriceFilter = () => {
    fetchFiltered();
  };

  return (
    <div className="flex flex-col items-center gap-6 pb-12">
      <img src={props.banner} alt='' className="w-full object-cover max-h-[480px]"></img>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full px-4 md:px-16 mt-6 gap-4">
        <p className="text-gray-500 text-sm md:text-base m-0">
          <span className="text-gray-800 font-semibold">{products.length}</span> products found
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="number"
            placeholder="Min $"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-24 px-3 py-2 rounded-full border border-gray-300 text-sm outline-none focus:border-red-400"
          />
          <input
            type="number"
            placeholder="Max $"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-24 px-3 py-2 rounded-full border border-gray-300 text-sm outline-none focus:border-red-400"
          />
          <button
            onClick={applyPriceFilter}
            className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-medium cursor-pointer hover:bg-red-600"
          >
            Apply
          </button>

          <div className="relative">
            <div
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 cursor-pointer hover:border-gray-400 transition-colors"
            >
              <span className="text-gray-700 text-sm md:text-base font-medium">Sort by</span>
              <img src={dropdown} alt='' className="w-3 md:w-4"></img>
            </div>

            {sortOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg py-2 w-40 z-10">
                <div
                  onClick={() => { setSortOrder("lowToHigh"); setSortOpen(false); }}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Price: Low to High
                </div>
                <div
                  onClick={() => { setSortOrder("highToLow"); setSortOpen(false); }}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Price: High to Low
                </div>
                <div
                  onClick={() => { setSortOrder(""); setSortOpen(false); }}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Default
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-4 w-full px-4 md:px-16">
        {products.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>

      <Link to={'/Men'} className="w-40 md:w-48 h-11 md:h-12 flex items-center justify-center rounded-full border-2 border-red-400 text-red-500 text-sm md:text-base font-semibold cursor-pointer hover:bg-red-500 hover:text-white transition-colors duration-300 mx-auto mt-8">
        Explore More
      </Link>
    </div>
  )
}