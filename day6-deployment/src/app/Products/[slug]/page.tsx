"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import { FaRegStarHalf } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { FaTwitter } from "react-icons/fa";
import { MdOutlineHorizontalRule } from "react-icons/md";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { LiaSmsSolid } from "react-icons/lia";

interface Product {
  _id: string;
  productName: string;
  category: string;
  price: number;
  inventory: number;
  colors: string;
  status: string;
  image: any;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
  size: string;
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await client.fetch(
        groq`
          *[_type == "product" && slug.current == $slug][0] {
            _id,
            productName,
            category,
            price,
            inventory,
            colors,
            status,
            image,
            description
          }
        `,
        { slug: params.slug }
      );
      setProduct(fetchedProduct);
    };

    fetchProduct();
  }, [params.slug]);

  const handleAddToCart = () => {
    if (!product) return;

    // Retrieve existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
    
    // Check if product already exists in cart
    const existingProductIndex = existingCart.findIndex(item => item._id === product._id);

    if (existingProductIndex > -1) {
      // Update quantity if product exists
      existingCart[existingProductIndex].quantity += quantity;
    } else {
      // Add new product to cart
      existingCart.push({
        ...product,
        quantity,
        size: selectedSize
      });
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));

    // Navigate to cart page
    router.push("/Bag");
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-4xl font-bold">Product not found!</p>
      </div>
    );
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
        {product.image && (
      <Image
      src={urlFor(product.image).url()}
      alt={product.productName}
      width={400}
      height={400}
      className="object-contain"
      />
    )}
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 className="text-sm title-font text-gray-500 tracking-widest">
          Nike
        </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.productName}
            </h1>
            <div className="flex mb-4">
          <span className="flex items-center">
          <IoMdStar className="text-blue-700" size={30} />
          <IoMdStar className="text-blue-700" size={30}/>
          <IoMdStar className="text-blue-700" size={30}/>
          <IoMdStar className="text-blue-700" size={30}/>
          <FaRegStarHalf className="text-blue-700" size={30} />
            <span className="text-gray-600 ml-3">4 Reviews</span>
          </span>
          <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-1">
            <Link href={'#'} className="text-gray-500">
            <TiSocialFacebook size={30} />
            </Link>
            <Link href={'#'} className="text-gray-500">
            <FaTwitter size={30} />
            </Link>
            <Link href={'#'} className="text-gray-500">
            <LiaSmsSolid size={30} />
            </Link>
          </span>
        </div>
        <p className="leading-relaxed">
        {product.description}
        </p>
        <div className="flex items-center mb-5">
              <span className="mr-3">Quantity</span>
              <div className="flex items-center">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 px-3 py-1 rounded-l"
                >
                  -
                </button>
                <span className="px-4 py-1 border">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-200 px-3 py-1 rounded-r"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color:</span>
                <span>{product.colors}</span>
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select 
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                  >
                    <option>SM</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
              <MdOutlineHorizontalRule  className="text-gray-400" />
              </span>
                </div>
              </div>
            </div>
           
            <div className="flex gap-10">
              <span className="title-font font-medium text-2xl text-gray-900">
                ₹{product.price}
              </span>
              <button
                onClick={handleAddToCart}
                className="bg-black text-white flex items-center justify-center space-x-2 px-6 py-3 rounded-full hover:bg-gray-800 transition duration-300"
              >
                <span>Add To Cart</span>
              </button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
            <svg
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}