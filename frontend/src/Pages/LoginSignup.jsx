import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

export default function LoginSignup() {
  const { fetchCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        fetchCart();
        alert("Login successful!");
        navigate("/");  
       
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log("Login error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  const signup = async () => {
    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        fetchCart();
        alert("Account created successfully!");
        navigate("/");  
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log("Signup error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-pink-50 via-rose-50 to-white px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-pink-100 p-8 md:p-10 flex flex-col gap-6">

        <div className="flex flex-col gap-1 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 m-0">{state}</h1>
          <p className="text-gray-400 text-sm m-0">
            {state === "Login" ? "Welcome back, please enter your details" : "Create an account to get started"}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {state === "Sign Up" && (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm md:text-base text-gray-700 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
            />
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
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
          onClick={() => { state === "Login" ? login() : signup() }}
          className="w-full py-3 md:py-4 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm md:text-base font-bold cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-red-200 transition-all duration-300"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p className="text-center text-gray-500 text-sm m-0">
            Already have an account?{" "}
            <span
              onClick={() => { setState("Login") }}
              className="text-red-500 font-semibold cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-center text-gray-500 text-sm m-0">
            Don't have an account?{" "}
            <span
              onClick={() => { setState("Sign Up") }}
              className="text-red-500 font-semibold cursor-pointer hover:underline"
            >
              Sign up here
            </span>
          </p>
        )}

        {state === "Sign Up" && (
          <div className="flex items-start gap-2 -mt-2">
            <input type="checkbox" className="mt-1 accent-red-500" />
            <p className="text-gray-400 text-xs leading-relaxed m-0">
              By continuing, I agree to the Terms of Use & Privacy Policy.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
