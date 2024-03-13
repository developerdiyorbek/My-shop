"use client";

import CustomImage from "@/components/Images";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CiTrash } from "react-icons/ci";

const Favorites = () => {
  const [likedCarts, setLikedCarts] = useState([]);

  useEffect(() => {
    const storedLikedCarts =
      JSON.parse(localStorage.getItem("likedCarts")) || [];
    setLikedCarts(storedLikedCarts);
  }, []);

  // remove product
  const removeCart = (id) => {
    const updatedLikedCarts = likedCarts.filter((product) => product.id !== id);
    localStorage.setItem("likedCarts", JSON.stringify(updatedLikedCarts));
    setLikedCarts(updatedLikedCarts);
  };

  if (!likedCarts?.length) {
    return (
      <div className="container mx-auto">
        <div className="mt-4 text-center">
          <p>
            You don`t have any liked carts.{" "}
            <Link href="/" className="text-blue-500">
              Go shopping
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-8 xl:px-0 my-10">
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {likedCarts?.map((product) => (
          <div
            key={product.id}
            className="border p-6 rounded-lg flex flex-col h-96 relative"
          >
            <div className="relative max-w-80 flex-1 ">
              <CustomImage product={product} fill />
            </div>
            <h3 className="tracking-widest text-[#ED165F] text-xs mt-4 font-medium title-font">
              {product.category}
            </h3>
            <h2 className="text-lg text-gray-900 font-medium title-font mb-2 line-clamp-1">
              {product.title}
            </h2>
            <p className="leading-relaxed text-base">${product.price}</p>
            <button
              className="absolute top-2 right-2 p-1 border rounded hover:bg-[#ED165F] hover:text-white duration-150"
              onClick={() => removeCart(product.id)}
            >
              <CiTrash size={25} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
