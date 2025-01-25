'use client';
import Image from "next/image";
import bin from "../../../Assets/bin.png";
import like from "../../../Assets/like.png";
import { PlusCircle, MinusCircle } from 'lucide-react';
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "../../../types/products";
import { getCartItems, removeFromCart, updateCartQuantity } from "../actions/actions";
import { urlFor } from "@/sanity/lib/image";
import Swal from "sweetalert2";

export default function Cart() {
  // const [cartItems, setCartItems] = useState<Product[]>([]);

  // useEffect(() => {
  //   setCartItems(getCartItems());
  // }, []);

  // const handleRemove = (id: string) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to undo this action!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#d33",
  //     cancelButtonColor: "#3085d6",
  //     confirmButtonText: "Yes, remove it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       removeFromCart(id);
  //       setCartItems(getCartItems());
  //       Swal.fire(
  //         "Removed!",
  //         "Item has been removed from your cart.",
  //         "success"
  //       );
  //     }
  //   });
  // };

  // const handleQuantityChange = (id: string, quantity: number) => {
  //   updateCartQuantity(id, quantity);
  //   setCartItems(getCartItems());
  // };

  // const handleIncrement = (id: string) => {
  //   const product = cartItems.find((item) => item._id === id);
  //   if (product) {
  //     handleQuantityChange(id, product.inventory + 1);
  //   }
  // };

  // const handleDecrement = (id: string) => {
  //   const product = cartItems.find((item) => item._id === id);
  //   if (product && product.inventory > 1) {
  //     handleQuantityChange(id, product.inventory - 1);
  //   }
  // };

  // const calculateTotal = () => {
  //   return cartItems.reduce(
  //     (total, item) => total + item.price * item.inventory,
  //     0
  //   );
  // };


  // const handleCheckout = () => {
    // Pass cartItems to the checkout page
    // Example of passing as query parameter
  //   const cartItemsQuery = cartItems.map(item => `productId=${item._id}&quantity=${item.inventory}`).join('&');
  //   window.location.href = `/Checkout?${cartItemsQuery}`;
  // };

  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        setCartItems(getCartItems());
        Swal.fire(
          "Removed!",
          "Item has been removed from your cart.",
          "success"
        );
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const handleIncrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product) {
      handleQuantityChange(id, product.inventory + 1);
    }
  };

  const handleDecrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product && product.inventory > 1) {
      handleQuantityChange(id, product.inventory - 1);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.inventory,
      0
    );
  };

  const handleCheckout = () => {
    const cartItemsQuery = cartItems.map(item => `productId=${item._id}&quantity=${item.inventory}`).join('&');
    window.location.href = `/Checkout?${cartItemsQuery}`;
  };

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
              <Link href={'/Help'}>View details</Link>
            </p>
          </div>
        </div>
    <h1 className="text-2xl font-bold mt-5 mb-6 text-gray-800">Shopping Cart</h1>

    <div>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center p-2 border-b border-gray-100"
          >
      
              {item.image && (
                <Image
                  src={urlFor(item.image).url()}
                  className="w-16 h-16 object-cover rounded-lg"
                  alt="image"
                  width={500}
                  height={500}
                />
              )}
      
      <div className="flex-1 ml-4">
                <h3 className="text-[14px] font-semibold">{item.productName}</h3>
                             
                {/* Quantity Controls */}
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleDecrement(item._id)}
                      className="hover:opacity-80"
                    >
                      <MinusCircle size={15} />
                    </button>
                    <span className="text-[14px] font-medium w-6 text-center">
                      {item.inventory}
                    </span>
                    <button 
                     onClick={() => handleIncrement(item._id)}
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
                      onClick={() => handleRemove(item._id)}
                    />
                  </div>
                </div>
              </div>              
              
              <p className="text-[12px] mb-[21%] sm:mb-[12%]">₹{item.price}</p>
         
            
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      )}
    </div>
    </div>




    
      <div className=" bg-slate-50 mb-5 p-4 rounded-lg shadow lg:w-1/3">
      <h1 className="text-[18px] font-medium mt-4 mb-4 text-center lg:text-start lg:ml-10 xl:ml-[20%]">
        Summary
      </h1>
      <div className="flex justify-evenly gap-10 mt-2">
        <p className="text-[14px]">Subtotal</p>
        <p className="text-[14px]">₹ {calculateTotal().toFixed(2)}</p>
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
        <p className="text-[14px] font-medium">₹ {calculateTotal().toFixed(2)}</p>
      </div>
      <div className="bg-black w-[160px] h-[40px] rounded-full flex justify-center items-center p-4 mt-6 ml-[28%] sm:ml-[38%] lg:ml-[28%] xl:ml-[32%]">
          <Link href={`/Checkout`}>
          <button onClick={handleCheckout} className="text-white text-[14px] font-medium">
            Member Checkout
          </button>
          </Link>
        </div>
    </div>
  
  </div>
)};


