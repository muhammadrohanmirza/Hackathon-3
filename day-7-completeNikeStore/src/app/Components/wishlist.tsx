"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
// import Link from "next/link";
// import { Eye, Trash2 } from "lucide-react";

import {
//   addToCart,

  getWishlistItems,
  moveAllToCart,
} from "@/app/actions/actions";
import { Product } from "../../../types/products"
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { allProduct } from "../../sanity/lib/query";
import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";



export default function WishlistPage() {

//   const router = useRouter();


  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [, setRecommendedItems] = useState<Product[]>([]);

  useEffect(() => {
    setWishlistItems(getWishlistItems());
    fetchRecommendedItems();
  }, []);

  const fetchRecommendedItems = async () => {
    const products: Product[] = await client.fetch(allProduct);
    setRecommendedItems(products.slice(0, 4)); // Get only 4 products for recommendation
  };

    // const handleRemoveFromWishlist = (productId: string) => {
    //     removeFromWishlist(productId);
    //     setWishlistItems(wishlistItems.filter((item) => item._id !== productId));
    //     toast.success("Item removed from wishlist!");
    // };


  const handleMoveAllToBag = () => {
    moveAllToCart();
    setWishlistItems([]);
    toast.success("All items moved to cart!");
  };

  const ProductCard = ({
    item,
  }: {
    item: Product;
    isWishlistItem?: boolean;
  }) => (
    <div className="group">
      <div className="relative aspect-square bg-[#F5F5F5] rounded-sm mb-4">
        {item.price && item.price > item.price && (
          <span className="absolute top-3 left-3 bg-[#DB4444] text-white text-xs px-3 py-1 rounded-sm">
            -{Math.round((1 - item.price / item.price) * 100)}%
          </span>
        )}
     
       

          {item.image && (
            <Image
              src={urlFor(item.image).url()}
              alt={item.productName}
              fill
              className="object-contain p-4 cursor-pointer"
            />
          )}
        {/* </Link> */}
        <div className="absolute inset-x-4 bottom-4"></div>
      </div>

      <h3 className="font-medium mt-2">{item.productName}</h3>
      <div className="flex gap-3 mb-2">
        <span className="text-black font-medium">${item.price}</span>
        {item.price && item.price > item.price && (
          <span className="text-[#666666] line-through">
            ${item.price}
          </span>
        )}
      </div>
    
    </div>
  );

  return (
    <div className={` min-h-screen bg-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-center mb-10">
          <h1 className={` text-2xl font-medium`}>
            Wishlist ({wishlistItems.length})
          </h1>
          {wishlistItems.length > 0 && (
            <button
              className="h-12 px-12 rounded-sm border-black hover:bg-black hover:text-white transition-colors"
              onClick={handleMoveAllToBag}
            >
              Move All To Bag
            </button>
          )}
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {wishlistItems.map((item) => (
              <ProductCard key={item._id} item={item} isWishlistItem={true} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-medium mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600">
              Add items to your wishlist to see them here.
            </p>
          </div>
        )}

        
      </div>
    </div>
  );
}