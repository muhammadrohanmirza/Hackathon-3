import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaYoutubeSquare } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

export default function Footer(){
    return(
        <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-col md:flex-row gap-8 md:gap-20">
              <div className="flex flex-col space-y-4">
                <h1>Find A Store</h1>
                <a href="#" className="text-gray-400 hover:text-white hover:underline">FIND A STORE</a>
                <a href="#" className="text-gray-400 hover:text-white hover:underline">BECOME A MEMBER</a>
                <a href="#" className="text-gray-400 hover:text-white hover:underline">SIGN UP FOR EMAIL</a>
                <a href="#" className="text-gray-400 hover:text-white hover:underline">Send Us Feedback</a>
                <a href="#" className="text-gray-400 hover:text-white hover:underline">STUDENT DISCOUNTS</a>
              </div>
              <div className="flex flex-col space-y-4">
                <h1>Get Help</h1>
                <a href="#" className="text-gray-400 hover:text-white hover:underline">Order Status</a>
                <a href="#" className="text-gray-400 hover:text-white hover:underline">Delivery</a>
                <a href="#" className="text-gray-400 hover:text-white hover:underline">Returns</a>
                <a href="#" className="text-gray-400 hover:text-white hover:underline">Payment Options</a>
                <a href="#" className="text-gray-400 hover:text-white hover:underline">Contact Us On Nike.com Inquiries</a>
                <a href="#" className="text-gray-400 hover:text-white hover:underline">Contact Us On All Other Inquiries</a>
              </div>
              <div className="flex flex-col space-y-4">
                <h1>About Nike</h1>
                <a href="#" className="text-gray-400 hover:text-white hover:underline">News</a>
                <a href="#" className="text-gray-400 hover:text-white hover:underline">Careers</a>
                <a href="#" className="text-gray-400 hover:text-white hover:underline">Investors</a>
                <a href="#" className="text-gray-400 hover:text-white hover:underline">Sustainability</a>
              </div>
            </div>
            <div className="flex justify-center md:justify-start gap-3 mt-8 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white"><AiFillTwitterCircle size={25} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><FaFacebook size={25} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><FaYoutubeSquare size={25} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><AiFillInstagram size={25} /></a>
            </div>
          </div>
    
          <div className="mt-16 md:mt-32 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-center md:text-left text-gray-400 hover:text-white">India © 2023 Nike, Inc. All Rights Reserved</div>
            <ul className="flex flex-wrap justify-center md:justify-start space-x-4 text-sm mt-4 md:mt-0">
              <li><a href="#" className="text-gray-400 hover:text-white hover:underline">Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white hover:underline">Terms of Sale</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white hover:underline">Terms of Use</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white hover:underline">Nike Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </footer>
        
    )
}