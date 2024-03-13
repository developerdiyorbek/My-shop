"use client";

import Image from "next/image";
import { useState } from "react";

const CustomImage = ({ product, fill }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {fill ? (
        <Image
          src={product.image}
          alt={product.category}
          fill
          className={`object-contain flex-1 duration-700 ease-in-out group-hover:opacity-75  ${
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          }`}
          priority
          onLoad={() => setIsLoading(false)}
        />
      ) : (
        <Image
          src={product.image}
          alt={product.category}
          className={`object-contain  duration-700 ease-in-out group-hover:opacity-75  ${
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          }`}
          priority
          width={400}
          height={500}
          onLoad={() => setIsLoading(false)}
        />
      )}
    </>
  );
};

export default CustomImage;
