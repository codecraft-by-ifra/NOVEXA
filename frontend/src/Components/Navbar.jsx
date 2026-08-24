import React, { useContext, useState, useEffect } from 'react';
import logo from '../Components/Assets/logo.png'
import cart_icon from '../Components/Assets/cart_icon.png'
import search_icon from '../Components/Assets/search_icon.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

export default function Navbar() {
    const [menu, setMenu] = useState("Shop");
    const { getTotalCartNumbers, logout } = useContext(ShopContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const path = location.pathname;
        if (path === '/') setMenu("Shop");
        else if (path === '/Men') setMenu("Men");
        else if (path === '/Woman') setMenu("Woman");
        else if (path === '/Kids') setMenu("Kids");
        else setMenu("");
    }, [location]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchText.trim() !== "") {
            navigate(`/search?q=${searchText.trim()}`);
            setSearchText("");
        }
    };

    return (
        <div className="flex items-center justify-between py-5 px-4 md:px-10 shadow-sm gap-4">
            <Link to='/' className="flex items-center">
                <img src={logo} alt='logo' className="w-15 md:w-20"></img>
                <p className="text-gray-800 font-semibold text-xl md:text-3xl">Novexa</p>
            </Link>

            <ul className="hidden lg:flex items-center gap-6 md:gap-14 list-none text-gray-800 font-medium text-sm md:text-lg">
                <li onClick={() => { setMenu("Shop") }} className="flex flex-col items-center gap-1 cursor-pointer">
                    <Link to={'/'} className="no-underline text-inherit">Shop</Link>
                    {menu === "Shop" && <hr className="w-3/5 h-[3px] rounded-full border-none bg-red-500 m-0" />}
                </li>
                <li onClick={() => { setMenu("Men") }} className="flex flex-col items-center gap-1 cursor-pointer">
                    <Link to={'/Men'} className="no-underline text-inherit">Men</Link>
                    {menu === "Men" && <hr className="w-3/5 h-[3px] rounded-full border-none bg-red-500 m-0" />}
                </li>
                <li onClick={() => { setMenu("Woman") }} className="flex flex-col items-center gap-1 cursor-pointer">
                    <Link to={'/Woman'} className="no-underline text-inherit">Woman</Link>
                    {menu === "Woman" && <hr className="w-3/5 h-[3px] rounded-full border-none bg-red-500 m-0" />}
                </li>
                <li onClick={() => { setMenu("Kids") }} className="flex flex-col items-center gap-1 cursor-pointer">
                    <Link to={'/Kids'} className="no-underline text-inherit">Kids</Link>
                    {menu === "Kids" && <hr className="w-3/5 h-[3px] rounded-full border-none bg-red-500 m-0" />}
                </li>
            </ul>

            <form onSubmit={handleSearch} className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2 flex-1 max-w-xs">
                <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search products..."
                    className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
                />
                <button type="submit" className="cursor-pointer">
                    <img src={search_icon} alt='search' className="w-10 h-7 opacity-60"></img>
                </button>
            </form>

            <div className="flex items-center gap-4 md:gap-8">
                {localStorage.getItem("auth-token") ? (
                    <>
                        <Link
                            to={'/orders'}
                            className="text-gray-700 text-sm md:text-base font-medium no-underline hover:text-red-500 transition-colors hidden md:block"
                        >
                            My Orders
                        </Link>
                        <button
                            onClick={() => {
                                logout();
                                navigate('/Login');
                            }}
                            className="w-24 h-10 md:w-32 md:h-12 rounded-full text-gray-700 bg-white border border-gray-300 text-sm md:text-base font-medium cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to={'/Login'}>
                        <button className="w-24 h-10 md:w-32 md:h-12 rounded-full text-gray-700 bg-white border border-gray-300 text-sm md:text-base font-medium cursor-pointer hover:bg-gray-50 transition-colors">
                            Login
                        </button>
                    </Link>
                )}
                <Link to={'/Cart'} className="relative">
                    <img src={cart_icon} alt='cart-icon' className="w-6 md:w-8"></img>
                    <div className="absolute -top-2 -right-2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-600 text-white text-[10px] md:text-xs flex items-center justify-center">
                        {getTotalCartNumbers()}
                    </div>
                </Link>
            </div>
        </div>
    )
}