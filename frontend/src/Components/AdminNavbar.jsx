import React from 'react';
import logo from '../Components/Assets/logo.png'
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function AdminNavbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        localStorage.removeItem("admin-token");
        navigate("/admin/login");
    };

    return (
        <div className="flex items-center justify-between py-5 px-4 md:px-10 shadow-sm gap-4">
            <Link to='/admin/products' className="flex items-center">
                <img src={logo} alt='logo' className="w-15 md:w-20"></img>
                <p className="text-gray-800 font-semibold text-xl md:text-3xl">Novexa</p>
            </Link>

            <ul className="hidden lg:flex items-center gap-6 md:gap-14 list-none text-gray-800 font-medium text-sm md:text-lg">
                <li className="flex flex-col items-center gap-1 cursor-pointer">
                    <Link to='/admin/products' className="no-underline text-inherit">Products</Link>
                    {location.pathname === "/admin/products" && (
                        <hr className="w-3/5 h-[3px] rounded-full border-none bg-red-500 m-0" />
                    )}
                </li>
                <li className="flex flex-col items-center gap-1 cursor-pointer">
                    <Link to='/admin/add-product' className="no-underline text-inherit">Add Product</Link>
                    {location.pathname === "/admin/add-product" && (
                        <hr className="w-3/5 h-[3px] rounded-full border-none bg-red-500 m-0" />
                    )}
                </li>
                <li className="flex flex-col items-center gap-1 cursor-pointer">
                    <Link to='/admin/orders' className="no-underline text-inherit">Orders</Link>
                    {location.pathname === "/admin/orders" && (
                        <hr className="w-3/5 h-[3px] rounded-full border-none bg-red-500 m-0" />
                    )}
                </li>
            </ul>

            <div className="flex items-center gap-4 md:gap-8">
                <button
                    onClick={logout}
                    className="w-24 h-10 md:w-32 md:h-12 rounded-full text-gray-700 bg-white border border-gray-300 text-sm md:text-base font-medium cursor-pointer hover:bg-gray-50 transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}