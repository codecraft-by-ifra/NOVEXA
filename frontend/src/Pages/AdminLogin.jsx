import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';


export default function AdminLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async () => {
        try {
            const response = await fetch(API_URL + "/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem("admin-token", data.token);
                navigate("/admin/add-product");
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.log("Admin login error:", error);
            alert("Something went wrong. Try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[100vh] bg-gradient-to-br from-pink-50 via-rose-50 to-white px-4 py-12">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-pink-100 p-8 md:p-10 flex flex-col gap-6">

                <div className="flex flex-col gap-1 text-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 m-0">Admin Login</h1>
                    <p className="text-gray-400 text-sm m-0">Login to manage products</p>
                </div>

                <div className="flex flex-col gap-4">
                    <input
                        name="email"
                        value={formData.email}
                        onChange={changeHandler}
                        type="email"
                        placeholder="Admin Email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm md:text-base text-gray-700 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                    />
                    <input
                        name="password"
                        value={formData.password}
                        onChange={changeHandler}
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm md:text-base text-gray-700 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                    />
                </div>

                <button
                    onClick={login}
                    className="w-full py-3 md:py-4 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm md:text-base font-bold cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-red-200 transition-all duration-300"
                >
                    Login
                </button>
            </div>
        </div>
    );
}