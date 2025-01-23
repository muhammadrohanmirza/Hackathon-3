'use client';
import Image from "next/image";
import bin from "../../../Assets/bin.png";
import like from "../../../Assets/like.png";
import { useEffect, useState } from "react";
import { PlusCircle, MinusCircle } from 'lucide-react';
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface CartItem {
  id: string;
  productName: string;
  price: number;
  image: string;
  quantity: number;
  detail?: string;
}

export default function Bag() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart from localStorage on component mount
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  const removeItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const updateQuantity = (id: string, action: 'increase' | 'decrease') => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const newQuantity = action === 'increase' 
          ? item.quantity + 1 
          : Math.max(1, item.quantity - 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const subtotal = items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  return (
    <div className="min-h-screen gap-5 bg-gray-100 p-4 flex flex-col lg:flex-row">
      <div className="flex-1 bg-slate-50 mb-5 p-4 rounded-lg shadow lg:w-2/3">
        <div className="bg-[#f0f0f0] w-auto mx-2 p-3">
          <p className="text-[13px] font-medium">Free Delivery</p>
          <div className="flex gap-2">
            <p className="text-[10px] xl:text-[12px] lg:text-[12px]">
              Applies to orders of ₹ 14 000.00 or more.
            </p>
            <p className="text-[10px] font-medium underline xl:text-[12px] lg:text-[12px]">
              <Link href={'#'}>View details</Link>
            </p>
          </div>
        </div>
        <h1 className="text-[18px] font-medium ml-2 mt-2">Bag</h1>
        <div>
          {items.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center p-2 border-b border-gray-100"
            >
              <Image
                    src={urlFor(product.image).url()}
                    alt={product.productName}
                    width={70}
                    height={70}
                    className=" w-[70px] h-[70px] object-contain"
                    />
              <div className="flex-1 ml-4">
                <h3 className="text-[14px] font-semibold">{product.productName}</h3>
                <p className="text-[12px] text-[#757575]">{product.detail || ''}</p>                
                {/* Quantity Controls */}
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateQuantity(product.id, 'decrease')}
                      className="hover:opacity-80"
                    >
                      <MinusCircle size={15} />
                    </button>
                    <span className="text-[14px] font-medium w-6 text-center">
                      {product.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(product.id, 'increase')}
                      className="hover:opacity-80"
                    >
                      <PlusCircle size={15} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Image
                      src={like}
                      alt="like"
                      className="w-6 h-6 cursor-pointer hover:opacity-80"
                    />
                    <Image
                      src={bin}
                      alt="delete"
                      className="w-4 h-4 cursor-pointer hover:opacity-80"
                      onClick={() => removeItem(product.id)}
                    />
                  </div>
                </div>
              </div>
              <p className="text-[12px] mb-[21%] sm:mb-[12%]">₹{product.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 mb-5 p-4 rounded-lg shadow lg:w-1/3">
        <h1 className="text-[18px] font-medium mt-4 mb-4 text-center lg:text-start lg:ml-10 xl:ml-[20%]">
          Summary
        </h1>
        <div className="flex justify-evenly gap-10 mt-2">
          <p className="text-[14px]">Subtotal</p>
          <p className="text-[14px]">₹ {subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-evenly mr-6 mt-2">
          <p className="text-[14px]">
            Estimated Delivery <br /> & Handling
          </p>
          <p className="text-[14px]">Free</p>
        </div>
        <div className="p-2 border-b border-gray-200 w-auto "></div>
        <div className="flex justify-evenly gap-5 mt-2">
          <p className="text-[14px]">Total</p>
          <p className="text-[14px] font-medium">₹ {subtotal.toFixed(2)}</p>
        </div>
        <div className="bg-black w-[160px] h-[40px] rounded-full flex justify-center items-center p-4 mt-6 ml-[28%] sm:ml-[38%] lg:ml-[28%] xl:ml-[32%]">
          <Link href={`/Checkout`}><button className="text-white text-[14px] font-medium">
            Member Checkout
          </button></Link>
        </div>
      </div>
    </div>
  );
}