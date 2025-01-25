"use client";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { Product } from "../../../../types/products";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { IoMdStar } from "react-icons/io";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { TiSocialFacebook } from "react-icons/ti";
import { FaTwitter } from "react-icons/fa";
import { LiaSmsSolid } from "react-icons/lia";
import { MdOutlineHorizontalRule } from "react-icons/md";
import Link from "next/link";
import { FaGripLinesVertical } from "react-icons/fa";
import { addToCart } from "@/app/actions/actions";
// import buy from "../../../../Assets/buy.png";
import swal from "sweetalert2";

interface ProductPageProps {
 params : Promise<{slug: string}>;

}

async function getProduct(slug: string) : Promise<Product> {
 return client.fetch( 
  groq` *[_type == "product" && slug.current == $slug][0]{
    _id,
    productName,
    category,
    price,
    inventory,
    colors,
    status,
    image,
    description,
    }`,{ slug }  
)};

const handleAddToCart = (e: React.MouseEvent, product: Product) => {
  e.preventDefault();
  swal.fire({
    position: 'top-right',
    icon: "success",
    title: `${product.productName} added to cart`,
    showConfirmButton: false,
    timer: 1000
  });
  addToCart(product)

  
}


export default async function ProductPage({ params }: ProductPageProps) {
  const {slug} = await params;
  const product = await getProduct(slug);

  return(
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
          <FaRegStarHalfStroke className="text-blue-700" size={30} />
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
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          <div className="flex mr-3 items-center">
            <span className="mr-3 font-extrabold">Color:</span>
            {product.colors}
          </div>
          <FaGripLinesVertical />
          <div className="flex ml-3 items-center">
            <span className="mr-3 font-extrabold">Size</span>
            <div className="relative">
              <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
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
          <span>₹</span>{product.price}
          </span>
          <button onClick={(e) => handleAddToCart(e, product)} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-extrabold py-2 px-4 rounded-lg shadow-md hover:shadow-lg  hover:scale-110 transition-transform duration-300 ease-out">
            Add To Cart
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

  )
}