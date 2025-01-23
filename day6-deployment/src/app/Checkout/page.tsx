'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import { FaBox } from "react-icons/fa";
import order from "../../../Assets/order.png"
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

interface CartItem {
  id: string;
  productName: string;
  price: number;
  image: string;
  quantity: number;
}

export default function Checkout() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  const subtotal = items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsConfirmed(true);
    localStorage.removeItem('cart');
  };

  if (isConfirmed) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] mt-6">
        <div className="text-center">
          <div className='flex flex-col justify-center items-center mb-4'>
            <Image src={order} alt='check' className='w-[40px] h-[40px]'/>
          </div>
          <h1 className="text-2xl font-bold mb-4">Your order is confirmed!</h1>
          <p className="text-gray-600">Thank you for shopping with us.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-slate-50 min-h-screen py-10">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-8 mx-auto max-w-7xl">
          <div className="lg:w-2/3 xl:w-3/5 bg-white p-6 rounded-lg shadow-md">
            <div>
              <h2 className="text-xl font-semibold mb-6">How would you like to get your order?</h2>
              <p className='text-gray-400'>
              Customs regulation for India require a copy of the recipient's KYC. The address on the KYC needs to match the shipping address. Our courier will contact you via SMS/email to obtain a copy of your KYC. The KYC will be stored securely and used solely for the purpose of clearing customs (including sharing it with customs officials) for all orders and returns. If your KYC does not match your shipping address, please click the link for more information.
              <Link href={'/Help'}> Learn More</Link>
              </p>
            </div>

            <div className="flex mb-4 border-solid border-black rounded-xl border-2 h-[82px] w-[240px] sm:w-[440px] gap-[24px] items-center pl-10 mt-5">
              <FaBox />
              Deliver It
            </div>

            <h1 className="text-[16px] font-medium mt-2">
              Enter your name and address:
            </h1>

            <div className="mt-4 flex flex-col gap-4">
              <input
                type="text"
                className="w-full h-[50px] border border-gray-400 rounded-md p-2 text-[14px]"
                placeholder="First Name"
                required
              />
              <input
                type="text"
                className="w-full h-[50px] border border-gray-400 rounded-md p-2 text-[14px]"
                placeholder="Last Name"
                required
              />
              <div className="relative">
                <input
                  type="text"
                  className="w-full h-[50px] border border-gray-400 rounded-md p-2 text-[14px] mb-2"
                  placeholder="Address Line 1"
                  required
                />
                <div className="absolute left-1 bottom-[-8px] text-[#757575] text-[10px]">
                  We do not ship to P.O. boxes
                </div>
              </div>
              <input
                type="text"
                className="w-full h-[50px] border border-gray-400 rounded-md p-2 text-[14px]"
                placeholder="Address Line 2"
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  className="w-full lg:w-1/2 h-[50px] border border-gray-400 rounded-md p-2 text-[14px]"
                  placeholder="Postal Code"
                  required
                />
                <input
                  type="text"
                  className="w-full lg:w-1/2 h-[50px] border border-gray-400 rounded-md p-2 text-[14px]"
                  placeholder="Locality"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <select
                  className="w-full h-[50px] p-2 border rounded-md text-[14px]"
                >
                  <option>State/Territory</option>
                  <option>Sindh</option>
                  <option>Punjab</option>
                  <option>Baluchistan</option>
                  <option>KPK</option>
                </select>
                <input
                  type="text"
                  placeholder="Pakistan"
                  className="w-full h-[50px] p-2 border rounded-md"
                  disabled
                />
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <label className="flex items-center text-[14px] text-[#757575]">
                <input type="checkbox" className="mr-2" required />
                Save this address to my profile
              </label>
              <label className="flex items-center text-[14px] text-[#757575]">
                <input type="checkbox" className="mr-2" required />
                Make this my preferred address
              </label>
            </div>



            <div className="relative">
            <h1 className="text-[16px] font-medium mt-2 mb-2">
             Payment Information:
            </h1>
              <div>
              <input
                  type="text"
                  className="w-full h-[50px] border border-gray-400 rounded-md p-2 text-[14px] mb-2"
                  placeholder="Card Number"
                  required
                />
              </div>
              <div>
              <input
                  type="text"
                  className="w-full h-[50px] border border-gray-400 rounded-md p-2 text-[14px] mb-2"
                  placeholder="Expiry Date"
                  required
                />
              </div>
              <div>
              <input
                  type="text"
                  className="w-full h-[50px] border border-gray-400 rounded-md p-2 text-[14px] mb-2"
                  placeholder="CVV"
                  required
                />
              </div>
              </div>


          </div>

          <div className="lg:w-1/3 xl:w-2/5 border-t lg:border-t-0 lg:border-l pl-0 lg:pl-4 bg-white p-6 rounded-lg shadow-md">
            <div className="mt-4">
              <h1 className="text-[18px] font-medium text-center mb-4">
                Order Summary
              </h1>
              <div>
                <div className="flex justify-between items-center">
                  <p className="text-[#8D8D8D] font-normal text-[14px]">Subtotal</p>
                  <p className="text-[#8D8D8D] font-normal text-[14px]">₹ {subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-[#8D8D8D] font-normal text-[14px]">Delivery/Shipping</p>
                  <p className="text-[#8D8D8D] font-normal text-[14px]">Free</p>
                </div>
                <div className="flex justify-between items-center border-t border-b border-gray-400 mt-4 py-2">
                  <p className="text-black font-medium text-[14px]">Total</p>
                  <p className="text-black font-medium text-[14px]">₹ {subtotal.toFixed(2)}</p>
                </div>
                <p className="text-[8px] font-normal text-[#757575] mt-2">
                  (The total reflects the price of your order, including all duties and taxes)
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h1 className="text-[14px] font-bold text-center">
                Arrives in 5-7 business days
              </h1>
              {items.map((item, index) => (
                <div key={index} className="flex gap-4 mt-4">
                  <Image
                  src={urlFor(item.image).url()}
                  alt={item.productName}
                  width={70}
                  height={70}
                  className=" w-[70px] h-[70px] object-contain"
                  />
                  <div>
                    <p className="text-[12px] font-medium">{item.productName}</p>
                    <p className="text-[12px] mt-1">Qty {item.quantity}</p>
                    <p className="text-[12px] font-bold mt-1">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <button 
            type="submit" 
            className="bg-black text-white px-10 py-3 rounded-full hover:bg-gray-800 transition duration-300"
          >
            Confirm Order
          </button>
        </div>
      </form>
    </div>
  );
}