"use client";

import CustomImage from "@/components/Images";
import { Dialog } from "@headlessui/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// react stars
import ReactStars from "react-stars";

const ProductDetailPage = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();
  const [isOpen, setIsOpen] = useState(true);
  console.log(product);

  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product = await res.json();
      setProduct(product);
      setLoading(false);
    };

    getProduct();
  }, [id]);

  const handleClose = () => {
    setIsOpen(false);
    router.back();
  };

  const data = JSON.parse(localStorage.getItem("data"));

  const handleAdd = (id) => {
    if (!data) {
      toast.error("You must log in first!");
      router.push("/login");
      return null;
    }

    const products = JSON.parse(localStorage.getItem("carts")) || [];

    const isExistProduct = products.find((c) => c.id === id);

    if (isExistProduct) {
      const UpdatedData = products.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            quantity: c.quantity + 1,
          };
        }
        return c;
      });

      localStorage.setItem("carts", JSON.stringify(UpdatedData));
    } else {
      const data = [...products, { ...product, quantity: 1 }];
      localStorage.setItem("carts", JSON.stringify(data));
    }
    toast.success("Product added to your bag!");
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className={"relative z-50"}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed overflow-y-auto inset-1">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className={"mx-auto max-w-3xl rounded bg-white p-10"}>
            {loading ? (
              <div className="h-8  w-8 rounded-full border-2 border-dotted border-blue-600 animate-spin" />
            ) : (
              <div className="flex gap-x-8 h-96">
                {product?.image && (
                  <div className="relative w-72 h-full hidden md:inline">
                    <CustomImage product={product} fill />
                  </div>
                )}
                <div className="flex flex-1 flex-col">
                  <div className="flex-1">
                    <h4 className="font-semibold">{product?.title}</h4>
                    <p className="font-medium text-xl">${product?.price}</p>
                    <div className="flex items-center text-sm my-4">
                      <p>{product?.rating.rate}</p>
                      {product?.rating.rate && (
                        <div className="flex items-center ml-2 mr-6">
                          <ReactStars
                            edit={false}
                            value={Math.floor(product?.rating.rate)}
                          />
                        </div>
                      )}
                      <p className="text-blue-600 hover:underline cursor-pointer text-xs">
                        see all {product?.rating.count} reviews
                      </p>
                    </div>
                    <p className="line-clamp-5 text-sm">
                      {product?.description}
                    </p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <button
                      className="button w-full bg-blue-600 text-white border-transparent hover:bg-white hover:text-blue-600 hover:border-blue-600 py-3 rounded border-2 duration-200"
                      onClick={() => product && handleAdd(product.id)}
                    >
                      Add to cart
                    </button>
                    <button
                      className="button w-full bg-blue-600 text-white border-transparent hover:bg-white hover:text-blue-600 hover:border-blue-600 py-3 rounded border-2 duration-200"
                      onClick={() => window.location.reload()}
                    >
                      View all details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductDetailPage;
