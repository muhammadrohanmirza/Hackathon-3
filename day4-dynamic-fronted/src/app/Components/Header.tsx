"use client"
import Image from "next/image";
import { useState } from 'react';
import logo2 from "../../../Assets/logo2.png";
import logo1 from "../../../Assets/logo1.png";
import { IoSearchOutline } from "react-icons/io5";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { RiMenu3Line } from "react-icons/ri";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="">

  <div className="bg-[#F5F5F5] flex items-center justify-between px-4 sm:px-6 lg:px-10 h-12 ">

    <div className="flex items-center">
     <Image src={logo1} alt="logo" className="w-6 sm:w-8" /> 
    </div>
   
    {/* <div className="hidden sm:flex w-[200px] h-8 bg-white justify-center items-center xl:ml-[20%] lg:ml-[10%] sm:ml-[10%]">
      <p className="text-black text-sm sm:text-base font-medium">
        Skip to main content
      </p>
    </div> */}
   
    <nav className="text-xs sm:text-sm lg:text-base space-x-2 sm:space-x-4 text-black font-medium flex items-center">
      <Link href="/Find" className="hover:underline">
        Find a Store
      </Link>
      <span>|</span>
      <Link href="/Help" className="hover:underline">
        Help
      </Link>
      <span>|</span>
      <Link href="/Join" className="hover:underline">
        Join Us
      </Link>
      <span>|</span>
      <Link href="/SignIn" className="hover:underline">
        Sign In
      </Link>
    </nav>
  </div>

      {/* HEADER 2 */}
      <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="">
          <Link href="/" className="text-blue-600">
          <Image src={logo2} alt='logo2' className='w-[60px] h-[30px] sm:w-[120px] sm:h-[50px]'/>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:block space-x-6">
          <Link href={'/Products'} className="text-gray-700  ">New & Featured</Link>
          <Link href={'/Products'} className="text-gray-700  ">Men</Link>
          <Link href={'/Products'} className="text-gray-700  ">Women</Link>
          <Link href={'/Products'} className="text-gray-700  ">Kids</Link>
          <Link href={'/Products'} className="text-gray-700  ">Sale</Link>
          <Link href={'/Products'} className="text-gray-700  ">SNKRS</Link>
        </nav>

        {/* Search Bar and Icons */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center border-2  rounded-md">
            <input
              type="text"
              placeholder="Search..."
              className="w-32 md:w-48 lg:w-64 px-4 py-2 outline-none"
            />
            <IoSearchOutline className='cursor-pointer w-[25px] h-[25px]'/>
          </div>
          <button className="hidden md:block text-gray-700 hover:text-red-600">
          <FaRegHeart className='cursor-pointer w-[25px] h-[25px]' />
          </button>
          <Link href={'/Bag'}>
          <button className=" hidden md:block text-gray-700 hover:text-black">
          <IoBagHandleOutline className='cursor-pointer w-[25px] h-[25px]' />
          </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-gray-700 hover:text-blue-600"
          onClick={toggleMobileMenu}
        >
          <RiMenu3Line className='cursor-pointer w-[28px] h-[28px]'/>
        </button>
      </div>

      {/* Mobile Navigation (Initially Hidden, toggled via useState) */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white p-4 space-y-4">
          <Link href={'/pages/Allproductpage'} className="text-gray-700  block">New & Featured</Link>
          <Link href={'/pages/Allproductpage'} className="text-gray-700  block">Men</Link>
          <Link href={'/pages/Allproductpage'} className="text-gray-700  block">Women</Link>
          <Link href={'/pages/Allproductpage'} className="text-gray-700  block">Kids</Link>
          <Link href={'/pages/Allproductpage'} className="text-gray-700  block">Sale</Link>
          <Link href={'/pages/Allproductpage'} className="text-gray-700  block">SNKRS</Link>
        </div>
      )}
    </header>
    </div>
  );
}