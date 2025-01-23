'use client'

import Image from "next/image";
import Header2 from "../Components/Header2";
import SideBar from "../Components/Side";
// import { productData } from "../productdata/data";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { Product } from "../../../types/products";
import { client } from "@/sanity/lib/client";
import { allProduct } from "@/sanity/lib/query";
import { urlFor } from "@/sanity/lib/image";

export default function Products() {
  const Related = [
    { category: "Best Selling Products" },
    { category: "Best Shoes" },
    { category: "New Basketball Shoes" },
    { category: "New Football Shoes" },
    { category: "New Men's Shoes" },
    { category: "New Running Shoes" },
    { category: "Best Men's Shoes" },
    { category: "New Jordan Shoes" },
    { category: "Best Women's Shoes" },
    { category: "Best Training & Gym" },
  ];

const [product, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    async function fetchProduct() {
      const fetchedProduct : Product[] = await client.fetch(allProduct);
      setProduct(fetchedProduct);
    };
    fetchProduct();

    
  }, []);

  return (
    <div>
      <Header2 />
      <div className="flex">
        <SideBar />
        <div className="px-4 py-8 ">
          


<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {product.map((product) => (
            
              
              <div key={product._id}>
                <Link href={`/Products/${product.slug.current}`}>
                <Image
                    src={urlFor(product.image).url()}
                    alt={product.productName}
                    className="rounded-md xl:w-[300px] xl:h-[300px]"
                    width={200}
                    height={200}
                  />
                  <h3 className="text-[12px] font-bold">{product.productName}</h3>
                  <p className="text-[#757575] text-[12px]">{product.colors}</p>
                  <p className="text-[#757575] text-[12px]">{product.status}</p>
                  <p className="text-black font-medium text-[10px] mt-1"><span>₹</span>{product.price}</p> 
                </Link>
              </div>
            ))}
          </div>
         






          <div className="border-t  w-auto mt-10"></div>
          <p className="text-2xl font-bold mb-4 mt-5">Related Categories</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Related.map((product, index) => (
              <div
                key={index}
                // className="bg-transparent border w-[120px] h-[30px] text-center rounded-full flex items-center justify-center"
              >
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full">{product.category}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


