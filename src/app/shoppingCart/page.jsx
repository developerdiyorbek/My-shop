"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { TbShoppingCartDiscount } from "react-icons/tb";
import CustomImage from "@/components/Images";

const ShoppingCart = () => {
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedProducts = JSON.parse(localStorage.getItem("carts")) || [];
      setProducts(savedProducts);
    }
  }, []);

  const removeProduct = (id) => {
    const updatedCart = products.filter((product) => product.id !== id);
    if (typeof window !== "undefined") {
      localStorage.setItem("carts", JSON.stringify(updatedCart));
    }
    setProducts(updatedCart);
  };

  const handleIncrement = (id) => {
    const updatedCart = products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }
      return product;
    });
    if (typeof window !== "undefined") {
      localStorage.setItem("carts", JSON.stringify(updatedCart));
    }
    setProducts(updatedCart);
  };

  const handleDecrement = (id) => {
    const isExist = products.find((product) => product.id === id);
    if (isExist.quantity === 1) {
      removeProduct(isExist.id);
    } else {
      const updatedCart = products.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });
      if (typeof window !== "undefined") {
        localStorage.setItem("carts", JSON.stringify(updatedCart));
      }
      setProducts(updatedCart);
    }
  };

  useEffect(() => {
    const total = products?.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotal(total);
  }, [products]);

  return (
    <>
      {products?.length ? (
        <div className="min-h-screen bg-gray-100 pt-20">
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {products.map((product) => {
                return (
                  <div
                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                    key={product.id}
                  >
                    <div className="relative w-[40%] mx-auto md:w-[20%]">
                      <CustomImage product={product} />
                    </div>
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
                          {product.title}
                        </h2>
                        <p className="mt-1 text-xs text-[#ED165F]">
                          {product.category}
                        </p>
                        <div className="flex gap-2 mt-3">
                          <p>{product.rating.rate}</p>
                          <div className="flex">
                            {" "}
                            {Array.from(
                              {
                                length: Math.floor(product?.rating.rate),
                              },
                              (_, i) => (
                                <FaStar
                                  size={20}
                                  key={i}
                                  className="text-yellow-500"
                                />
                              )
                            )}
                            {Array.from(
                              {
                                length: 5 - Math.floor(product?.rating.rate),
                              },
                              (_, i) => (
                                <CiStar
                                  size={20}
                                  key={i}
                                  className="text-yellow-500"
                                />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <span
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-[#ED165F] hover:text-blue-50"
                            onClick={() => handleDecrement(product.id)}
                          >
                            {" "}
                            -{" "}
                          </span>
                          <p className="px-[4px] py-[2px] border bg-white">
                            {product?.quantity}
                          </p>
                          <span
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-[#ED165F] hover:text-blue-50"
                            onClick={() => handleIncrement(product.id)}
                          >
                            {" "}
                            +{" "}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm">
                            {(product.price * product.quantity).toLocaleString(
                              "en-US",
                              {
                                style: "currency",
                                currency: "usd",
                              }
                            )}
                          </p>
                          <button
                            className="border-[2px] duration-150 p-[2px] hover:border-[#ED165F] rounded group"
                            onClick={() => removeProduct(product.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-5 w-5 cursor-pointer duration-150 group-hover:text-[#ED165F]"
                            >
                              <path
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">
                  {total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "usd",
                  })}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">$10</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">
                    {(total + 10).toLocaleString("en-US", {
                      style: "currency",
                      currency: "usd",
                    })}
                  </p>
                  <p className="text-sm text-gray-700">Including Delivery</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-md bg-[#ED165F] py-1.5 font-medium text-blue-50 hover:opacity-80">
                Check out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-32">
          <TbShoppingCartDiscount className="w-24 h-24 text-gray-400" />
          <p className="mt-4 text-lg md:text-3xl text-gray-600">
            Your shopping cart is empty
          </p>
          <Link href="/" className="mt-4 text-lg text-blue-500 hover:underline">
            Go shopping
          </Link>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
