"use client";

import { GoHeartFill } from "react-icons/go";

import Link from "next/link";
import CustomImage from "./Images";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Product = ({ product }) => {
  // router
  const router = useRouter();
  // data
  const data = JSON.parse(localStorage.getItem("data"));

  //favorites
  const handleFavorite = (product) => {
    if (!data) {
      toast.error("You must log in first!");
      router.push("/login");
      return null;
    }

    const products = JSON.parse(localStorage.getItem("likedCarts")) || [];

    const isExist = products.find((c) => c.id === product?.id);

    if (isExist) {
      toast.error("This product is already added!");
      return null;
    } else {
      const data = [...products, { ...product }];
      localStorage.setItem("likedCarts", JSON.stringify(data));
    }
    toast.success("product add to favorites carts 🙂");
  };

  return (
    <div className="relative">
      <Link
        href={`product/${product.id}`}
        className="border p-6 rounded-lg flex flex-col h-96 transition-transform ease-in-out duration-200 hover:scale-105 "
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
      </Link>
      <button
        className="absolute top-3 right-4 rounded border p-1 bg-white text-[#ED165F]  hover:bg-[#ED165F] hover:text-white duration-150"
        onClick={() => handleFavorite(product)}
      >
        <GoHeartFill size={25} />
      </button>
    </div>
  );
};

export default Product;
