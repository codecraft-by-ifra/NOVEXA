import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item';

export default function Wishlist() {
    const { fetchWishlist } = useContext(ShopContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadWishlist = () => {
        const token = localStorage.getItem("auth-token");
        if (!token) {
            setLoading(false);
            return;
        }

        fetch(API_URL + "/getwishlist", {
            headers: { "auth-token": token },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setProducts(data.products);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        loadWishlist();
        fetchWishlist();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <div className="px-4 md:px-16 py-8">Loading your wishlist...</div>;
    }

    if (!localStorage.getItem("auth-token")) {
        return <div className="px-4 md:px-16 py-8">Please login to see your wishlist.</div>;
    }

    if (products.length === 0) {
        return <div className="px-4 md:px-16 py-8">Your wishlist is empty.</div>;
    }

    return (
        <div className="flex flex-col gap-6 px-4 md:px-16 py-8">
            <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {products.map((item, i) => (
                    <Item
                        key={i}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                    />
                ))}
            </div>
        </div>
    );
}