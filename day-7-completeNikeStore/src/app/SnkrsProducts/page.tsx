"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { Product } from "../../../types/products";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { FaRegHeart } from "react-icons/fa";
import {addToWishlist, getWishlistItems, removeFromWishlist } from "../actions/actions";
import toast from "react-hot-toast";
import { SNKRS } from "@/sanity/lib/query";


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
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [showMoreVisible, setShowMoreVisible] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const products: Product[] = await client.fetch(SNKRS);
      setAllProducts(products);
      setDisplayedProducts(products.slice(0, 24));
      setShowMoreVisible(products.length > 24);
    }

    fetchProducts();
    setWishlist(getWishlistItems());
  }, []);

  const handleAddToWishlist = (e: React.MouseEvent, product: Product) => {
    e.preventDefault(); // Prevent default link behavior
    const isInWishlist = wishlist.find(item => item._id === product._id);

    if (isInWishlist) {
      removeFromWishlist(product._id);
      toast.success(`${product.productName} removed from wishlist!`);
      setWishlist(wishlist.filter(item => item._id !== product._id));
    } else {
      addToWishlist(product);
      toast.success(`${product.productName} added to wishlist!`);
      setWishlist([...wishlist, product]);
    }
  };

  const isProductInWishlist = (productId: string) => {
    return wishlist.some(item => item._id === productId);
  };

  const loadMoreProducts = () => {
    const currentLength = displayedProducts.length;
    const nextProducts = allProducts.slice(currentLength, currentLength + 8);
    setDisplayedProducts([...displayedProducts, ...nextProducts]);
    
    if (displayedProducts.length + nextProducts.length >= allProducts.length) {
      setShowMoreVisible(false);
    }
  };

  return (
    <div>  
      <div className="flex"> 
        <div className="px-4 py-8 ">
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedProducts.map((product) => (
              <div key={product._id} className="rounded-lg shadow-md p-4 bg-white border border-gray-200 ">
                <Link href={`/Products/${product.slug.current}`}>
                <div className="relative aspect-square bg-slate-50  rounded-[4px] sm:p-4">
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 flex flex-col gap-2">
                    <button 
                      className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white ${isProductInWishlist(product._id) ? 'text-red-500' : ''}`} 
                      onClick={(e) => handleAddToWishlist(e, product)}
                    >
                      <FaRegHeart  className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                  {product.image && (
                    <Image
                      src={urlFor(product.image).url()}
                      alt={product.productName}
                      width={200}
                  height={200}
                      className="rounded-md xl:w-[300px] xl:h-[300px]"
                    />
                  )}
                </div>
                <div className="p-2 sm:p-3">
                  <h3 className="font-medium text-sm sm:text-base mb-1 sm:mb-2">{product.productName}</h3>
                  <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                    <span className="text-black font-medium text-sm sm:text-base"><span>₹</span>{product.price}</span>
                  </div>
                </div>
                </Link>
              </div>
            ))}
          </div>
          {/* Show More Products Button */}
        {showMoreVisible && (
          <div className="flex justify-center mt-6 sm:mt-10">
            <button 
              className="bg-gray-800 hover:bg-black font-extrabold text-white h-10 sm:h-12 px-8 sm:px-12 rounded-[4px] text-sm sm:text-base"
              onClick={loadMoreProducts}
            >
              Show More Products
            </button>
          </div>
        )}
          <div className="border-t  w-auto mt-10"></div>
          <p className="text-2xl font-bold mb-4 mt-5">Related Categories</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Related.map((product, index) => (
              <div
                key={index}
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


