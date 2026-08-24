import React, { useState } from 'react'

export default function DescriptionBox() {
  const [activeTab, setActiveTab] = useState("Description");

  return (
    <div className="flex flex-col mt-10 w-full">
      <div className="flex items-center gap-8 border-b border-gray-200">
        <div
          onClick={() => setActiveTab("Description")}
          className={`pb-4 text-sm md:text-base font-semibold cursor-pointer transition-colors border-b-2
            ${activeTab === "Description"
              ? "text-gray-900 border-red-500"
              : "text-gray-400 border-transparent hover:text-gray-600"
            }`}
        >
          Description
        </div>
        <div
          onClick={() => setActiveTab("Reviews")}
          className={`pb-4 text-sm md:text-base font-semibold cursor-pointer transition-colors border-b-2
            ${activeTab === "Reviews"
              ? "text-gray-900 border-red-500"
              : "text-gray-400 border-transparent hover:text-gray-600"
            }`}
        >
          Reviews (122)
        </div>
      </div>

      <div className="flex flex-col gap-4 py-6 max-w-3xl">
        {activeTab === "Description" ? (
          <p className="text-gray-500 text-sm md:text-base leading-relaxed m-0">
            An E-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence.
          </p>
        ) : (
          <p className="text-gray-500 text-sm md:text-base leading-relaxed m-0">
            E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., size, color). Each product usually has its own dedicated page with relevant information.
          </p>
        )}
      </div>
    </div>
  )
}