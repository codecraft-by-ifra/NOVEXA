import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

    const [all_product, setAll_product] = useState([]);
    const [cartitems, setcartitems] = useState({});
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/allproducts")
            .then((res) => res.json())
            .then((data) => setAll_product(data));
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("auth-token");
        if (token) {
            fetch("http://localhost:4000/getcart", {
                headers: {
                    "auth-token": token,
                },
            })
                .then((res) => res.json())
                .then((data) => setcartitems(data));
        }
    }, []);

    const addToCart = async (itemId) => {
        const token = localStorage.getItem("auth-token");
        if (!token) {
            alert("Please login first");
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/addtocart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
                body: JSON.stringify({ itemId }),
            });

            const data = await response.json();

            if (data.outOfStock) {
                alert("This product is out of stock");
                return;
            }

            if (!data.success) {
                alert(data.error || "Something went wrong");
                return;
            }

            setcartitems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
        } catch (error) {
            alert("Something went wrong. Try again.");
        }
    }

    const removeToCart = (itemId) => {
        setcartitems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) - 1 }));

        const token = localStorage.getItem("auth-token");
        if (token) {
            fetch("http://localhost:4000/removefromcart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
                body: JSON.stringify({ itemId }),
            });
        }
    }

    const getTotalCartNumbers = () => {
        let totalitem = 0;
        for (const item in cartitems) {
            if (cartitems[item] > 0) {
                totalitem += cartitems[item]
            }
        }
        return totalitem;
    }

    const fetchWishlist = () => {
        const token = localStorage.getItem("auth-token");
        if (!token) {
            setWishlist([]);
            return;
        }

        fetch("http://localhost:4000/getwishlist", {
            headers: { "auth-token": token },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setWishlist(data.products.map((p) => p.id));
                }
            });
    };

    const toggleWishlist = async (itemId) => {
        const token = localStorage.getItem("auth-token");
        if (!token) {
            alert("Please login first");
            return;
        }

        const isInWishlist = wishlist.includes(itemId);
        const url = isInWishlist
            ? "http://localhost:4000/removefromwishlist"
            : "http://localhost:4000/addtowishlist";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
                body: JSON.stringify({ itemId }),
            });

            const data = await response.json();

            if (data.success) {
                setWishlist(data.wishlist);
            }
        } catch (error) {
            alert("Something went wrong. Try again.");
        }
    };


    const fetchCart = () => {
        const token = localStorage.getItem("auth-token");
        if (token) {
            fetch("http://localhost:4000/getcart", {
                headers: {
                    "auth-token": token,
                },
            })
                .then((res) => res.json())
                .then((data) => setcartitems(data));
        } else {
            setcartitems({});
        }
    };

    useEffect(() => {
        fetchCart();
        fetchWishlist();
    }, []);

    const logout = () => {
        localStorage.removeItem("auth-token");
        setcartitems({});
        setWishlist([]);
    };

    const contextValue = { all_product, cartitems, addToCart, removeToCart, getTotalCartNumbers, fetchCart, logout, wishlist, toggleWishlist, fetchWishlist};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;