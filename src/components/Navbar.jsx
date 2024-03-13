"use client";

import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
  const data = JSON.parse(localStorage.getItem("data"));

  return (
    <header className="text-gray-600 body-font shadow-md sticky top-0 left-0 bg-white z-10">
      <div className="container mx-auto px-5 sm:px-0 flex flex-wrap py-5  items-center justify-between">
        <Link
          className="title-font font-medium text-xl  text-gray-900"
          href="/"
        >
          Diyorbek
        </Link>
        <div className="flex">
          <nav className="flex flex-wrap items-center text-base justify-center">
            <Link
              className="sm:mr-5 mr-3 hover:text-[#ED165F] duration-150"
              href="/shoppingCart"
            >
              <FaCartShopping size={20} />
            </Link>
            <Link
              href={"/favorites"}
              className="sm:mr-5 mr-3 hover:text-[#ED165F] duration-150"
            >
              <FaHeart size={20} />
            </Link>
            {!data && (
              <Link
                href={"/login"}
                className="sm:mr-5 mr-3 border rounded bg-[#ED165F] py-1 hover:opacity-70 duration-200 px-4 text-white"
              >
                Log in
              </Link>
            )}
            {data && (
              <Link
                href={"/account"}
                className="sm:mr-5 mr-3 hover:text-[#ED165F] duration-200"
              >
                <FaUser size={22} />
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
