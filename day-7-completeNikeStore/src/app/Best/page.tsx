'use client'
import Image from "next/image";
import right from "../../../Assets/right.png";
import left from "../../../Assets/left.png";
import Link from "next/link";

import { sixProduct } from "@/sanity/lib/query";
import { useEffect, useState } from "react";
import { Product } from "../../../types/products";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export default function Best() {
  

  const [product, setProduct] = useState<Product[]>([]);
    useEffect(() => {
      async function fetchProducts() {
        const fetchedProducts : Product[] = await client.fetch(sixProduct);
        setProduct(fetchedProducts);
      };
      fetchProducts();
  
      
    }, []);

  return (
    <div className="px-4">
      {/* Header Section */}
      <div className="flex flex-col mt-10 sm:flex-row sm:items-center sm:gap-[40%] sm:justify-between">
        <h1 className="text-[14px] font-medium text-text2 text-center xl:ml-[3%] xl:text-[16px] lg:ml-[4%] lg:text-[14px] sm:ml-[5%] sm:mt-4">
          Best of Air Max
        </h1>

        <div className="flex gap-2 items-center justify-center mt-4 lg:ml-[15%] xl:ml-[25%] sm:mr-4">
          <p className="text-[12px] font-medium">Shop</p>
          <div className="bg-[#E5E5E5] rounded-full h-7 w-7 flex items-center justify-center">
            <Image src={left} alt="arrow" className="w-3 h-3" />
          </div>
          <div className="bg-[#CCCCCC] rounded-full h-7 w-7 flex items-center justify-center">
            <Image src={right} alt="arrow" className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Product */}
      <div className="flex overflow-x-auto scrollbar-hide mt-4 gap-4">
      {product.map((product) => (
          <div
            key={product._id}
            className=" flex-shrink-0 rounded-lg shadow-md p-4 bg-white border border-gray-200 "
          >
            <Link href={`/Products/${product.slug.current}`}>
            <Image
              src={urlFor(product.image).url()}
              alt={product.productName}
              className="rounded-md xl:w-[300px] xl:h-[300px]"
              width={200}
              height={200}
            />
            <h3 className="text-[18px] font-bold">{product.productName}</h3>
            <p className="text-black font-medium text-[15px] mt-1"><span>₹</span>{product.price}</p> 
            <p className="text-[12px] text-[#757575]">{product.catagory}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
