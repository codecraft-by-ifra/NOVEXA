import React, { useEffect, useState } from 'react';

export default function AdminProductList() {
    const [allProducts, setAllProducts] = useState([]);

    const fetchInfo = () => {
        fetch("http://localhost:4000/allproducts")
            .then((res) => res.json())
            .then((data) => setAllProducts(data));
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <div className="flex flex-col gap-6 px-4 md:px-16 py-8">
            <h1 className="text-2xl font-bold text-gray-900">All Products</h1>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200 text-gray-500">
                            <th className="py-3 px-2">Image</th>
                            <th className="py-3 px-2">Name</th>
                            <th className="py-3 px-2">Category</th>
                            <th className="py-3 px-2">Price</th>
                            <th className="py-3 px-2">Stock</th>
                            <th className="py-3 px-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProducts.map((product, i) => (
                            <tr key={i} className="border-b border-gray-100">
                                <td className="py-3 px-2">
                                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                                </td>
                                <td className="py-3 px-2 text-gray-800">{product.name}</td>
                                <td className="py-3 px-2 text-gray-600 capitalize">{product.category}</td>
                                <td className="py-3 px-2 text-gray-800">${product.new_price}</td>
                                <td className="py-3 px-2 text-gray-800 font-medium">{product.quantity}</td>
                                <td className="py-3 px-2">
                                    {product.quantity > 0 ? (
                                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                            In Stock
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                                            Out of Stock
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}