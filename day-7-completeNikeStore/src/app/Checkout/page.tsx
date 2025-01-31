'use client';
import Image from "next/image";
import { FaBox } from "react-icons/fa";
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { Product } from '../../../types/products';
import { useEffect, useState } from "react";
import { getCartItems } from "../actions/actions";
import order from "@/sanity/schemaTypes/order";
import { client } from "@/sanity/lib/client";
import Swal from "sweetalert2";


export default function Checkout() {

const [cartItems, setCartItems] = useState<Product[]>([]);
const [discount, setDiscount] = useState<number>(0);
const [formValue, setFormValue] = useState({
  firstname: '',
  lastname: '',
  address: '',
  city: '',
  zipcode: '',
  phonenumber: '',
  email: '',
  // cardnumber: '',
  // expirydate: '',
  // cvv: ''

});
const [formError, setFormError] = useState({
  firstname: false,
  lastname: false,
  address: false,
  city: false,
  zipcode: false,
  phonenumber: false,
  email: false,
  // cardnumber: false,
  // expirydate: false,
  // cvv: false
  
});

useEffect(() => {
  setCartItems(getCartItems());
  const applyDiscount = localStorage.getItem('applyDiscount');
  if (applyDiscount) {
    setDiscount(Number(applyDiscount));
  }
}, []);


    const subtotal = cartItems.reduce((total, item) => 
         total + item.price * item.inventory, 0);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormValue({
        ...formValue,
        [e.target.id]: e.target.value
      });
    }

    const validateForm = () => {
      const error = {
        firstname: !formValue.firstname,
        lastname: !formValue.lastname,
        address: !formValue.address,
        city: !formValue.city,
        zipcode: !formValue.zipcode,
        phonenumber: !formValue.phonenumber,
        email: !formValue.email,
        // cardnumber: !formValue.cardnumber,
        // expirydate: !formValue.expirydate,
        // cvv: !formValue.cvv
      };
      
      setFormError(error);
      return Object.values(error).every((error) => !error);
      }


    const handlePlaceOrder = async () => {
        // if (validateForm()) {
        //   // Place order logic here
        //   // setIsConfirmed(true);
        //   // Clear cart after placing order
        //   localStorage.removeItem('appliedDiscount');
        // }

        Swal.fire({
          title: 'Processing your order....',
          text: 'Please wait a moment.',
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Process',
        }).then((result) => {
          if (result.isConfirmed) {
            if (validateForm()) {
              localStorage.removeItem('appliedDiscount');
              Swal.fire(
                'Success!',
                'Your order has been successfully processed!',
                'success'
              );
              
            } else {
            Swal.fire(
              'Error!',
              'Please fill in all the fields before proceeding.',
              'error'
            );
          }
        }
        });

        const orderData = {
          _type: 'order',
          firstName: formValue.firstname,
          lastName: formValue.lastname,
          address: formValue.address,
          city: formValue.city,
          zipcode: formValue.zipcode,
          phone: formValue.phonenumber,
          email: formValue.email,
          cartitems: cartItems.map(items => ({
            _type: 'reference',
            _ref : items._id,
          })),
          total : subtotal,
          discount : discount,
          orderDate : new Date().toISOString()
        };
      try {
      await client.create(orderData)
      localStorage.removeItem('applyDiscount');
      } catch (error) {
      console.error('error creating order', error)
      }
    };
    

  return (
    <div className="p-4 bg-slate-50 min-h-screen py-10">
      {/* <form onSubmit={}> */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-8 mx-auto max-w-7xl">
          <div className="lg:w-2/3 xl:w-3/5 bg-white p-6 rounded-lg shadow-md">
            <div>
              <h2 className="text-xl font-semibold mb-6">How would you like to get your order?</h2>
              <p className='text-gray-400'>
              Customs regulation for India require a copy of the recipient's KYC. The address on the KYC needs to match the shipping address. Our courier will contact you via SMS/email to obtain a copy of your KYC. The KYC will be stored securely and used solely for the purpose of clearing customs (including sharing it with customs officials) for all orders and returns. If your KYC does not match your shipping address, please click the link for more information.
              <Link href={'/Help'} className="underline"> Learn More</Link>
              </p>
            </div>

            <div className="flex mb-4 border-solid border-black rounded-xl border-2 h-[82px] w-[240px] sm:w-[440px] gap-[24px] items-center pl-10 mt-5">
              <FaBox />
              Deliver It
            </div>

            <h1 className="text-[16px] font-medium mt-2">
              Enter your information:
            </h1>

            <div className="mt-4 flex flex-col gap-4">
             <div>
             <label htmlFor="firstName">First Name</label>
             <input
                type="text"
                id="firstname"
                className="w-full h-[50px] border border-gray-400 rounded-md p-2 text-[14px]"
                placeholder="Enter your First Name"
                value={formValue.firstname}
                onChange={handleInputChange}
              />
              {formError.firstname && (
                  <p className="text-sm text-red-500">
                    First name is required.
                  </p>
                )}
             </div>
             <div>
             <label htmlFor="lastName">Last Name </label>
             <input
                type="text"
                id="lastname"
                className="w-full h-[50px] border border-gray-400 rounded-md p-2 text-[14px]"
                placeholder="Enter your Last Name"
                value={formValue.lastname}
                onChange={handleInputChange}
              />
              {formError.lastname && (
                  <p className="text-sm text-red-500">
                    Last name is required.
                  </p>
                )}
             </div>
              <div className="relative">
                <label htmlFor="address1">Address</label>
                <input
                  id="address"
                  className="w-full h-[50px] border border-gray-400 rounded-md p-2 text-[14px] mb-2"
                  placeholder="Enter your Address"
                  value={formValue.address}
                  onChange={handleInputChange}
                />
                {formError.address && (
                  <p className="text-sm text-red-500">Address is required</p>
                )}
              </div>
              <div className="relative">
                <label htmlFor="address1">City</label>
                <input
                  id="city"
                  className="w-full h-[50px] border border-gray-400 rounded-md p-2 text-[14px] mb-2"
                  placeholder="Enter your city"
                  value={formValue.city}
                  onChange={handleInputChange}
                />
                {formError.city && (
                  <p className="text-sm text-red-500">City is required</p>
                )}
              </div>
              <div className="relative">
                <label htmlFor="address1">Zip Code</label>
                <input
                  id="zipcode"
                  className="w-full h-[50px] border border-gray-400 rounded-md p-2 text-[14px] mb-2"
                  placeholder="Enter your zipcode"
                  value={formValue.zipcode}
                  onChange={handleInputChange}
                />
                {formError.zipcode && (
                  <p className="text-sm text-red-500">Zip code is required</p>
                )}
              </div>
              <div className="relative">
                <label htmlFor="address1">Phone Number</label>
                <input
                type="tel"
                  id="phonenumber"
                  className="w-full h-[50px] border border-gray-400 rounded-md p-2 text-[14px] mb-2"
                  placeholder="Enter your Phone Number"
                  value={formValue.phonenumber}
                  onChange={handleInputChange}
                />
                {formError.phonenumber && (
                  <p className="text-sm text-red-500">Phone Number is required</p>
                )}
              </div>
              <div className="relative">
                <label htmlFor="address1">Email</label>
                <input
                type="email"
                  id="email"
                  className="w-full h-[50px] border border-gray-400 rounded-md p-2 text-[14px] mb-2"
                  placeholder="Enter your email"
                  value={formValue.email}
                  onChange={handleInputChange}
                />
                {formError.email && (
                  <p className="text-sm text-red-500">Email is required</p>
                )}
              </div>
            </div>

            {/* <div className="relative">
            <h1 className="text-[16px] font-medium mt-2 mb-2">
             Payment Information:
            </h1>
              <div>
              <input
                  type="text"
                  id="cardnumber"
                  className="w-full h-[50px] border border-gray-400 rounded-md p-2 text-[14px] mb-2"
                  placeholder="Enter your Card Number"
                  value={formValue.cardnumber}
                  onChange={handleInputChange}
                />
                {formError.cardnumber && (
                  <p className="text-sm text-red-500">
                    Card Number is required.
                  </p>
                )}
              </div>
              <div>
              <input
                  type="date"
                  id="expirydate"
                  className="w-full h-[50px] border border-gray-400 rounded-md p-2 text-[14px] mb-2"
                  placeholder="Enter your card Expiry Date"
                  value={formValue.expirydate}
                  onChange={handleInputChange}
                />
                {formError.expirydate && (
                  <p className="text-sm text-red-500">
                    Expiry Date is required.
                  </p>
                )}
              </div>
              <div>
              <input
                  type="text"
                  id="cvv"
                  className="w-full h-[50px] border border-gray-400 rounded-md p-2 text-[14px] mb-2"
                  placeholder="Enter your CVV"
                  value={formValue.cvv}
                  onChange={handleInputChange}
                />
                {formError.cvv && (
                  <p className="text-sm text-red-500">
                    CVV is required.
                  </p>
                )}
              </div>
              </div> */}


          </div>

          <div className="lg:w-1/3 xl:w-2/5 border-t lg:border-t-0 lg:border-l pl-0 lg:pl-4 bg-white p-6 rounded-lg shadow-md">
            <div className="mt-4">
              <h1 className="text-[18px] font-medium text-center mb-4">
                Order Summary
              </h1>
              <div>
                <div className="flex justify-between items-center">
                  <p className="text-[#8D8D8D] font-normal text-[14px]">Subtotal</p>
                  <p className="text-[#8D8D8D] font-normal text-[14px]">₹ {subtotal}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[#8D8D8D] font-normal text-[14px]">Discount</p>
                  <p className="text-[#8D8D8D] font-normal text-[14px]">₹ {discount}</p>
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
              {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item._id} className="flex gap-4 mt-4">
                  <Image
                    src={urlFor(item.image).url()}
                    alt={item.productName}
                    width={70}
                    height={70}
                    className=" w-[70px] h-[70px] object-contain"
                  />
                  <div>
                    <p className="text-[12px] font-medium">{item.productName}</p>
                    <p className="text-[12px] mt-1">Qty {item.inventory}</p>
                    <p className="text-[12px] font-bold mt-1">₹{item.price}</p>
                  </div>
                </div>
              ))
              ) : (
                <p className="text-center">No items in cart</p>
              )}
            </div>
            <div className="text-center mt-6">
          <button 
            type="submit" 
            className="bg-black sm:w-96 text-white px-10 py-3 rounded-full hover:bg-gray-800 transition duration-300"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
          </div>
        </div>
       
      {/* </form> */}
    </div>
  ); 
}






