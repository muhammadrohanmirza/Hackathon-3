"use client";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { Product } from "../../../../types/products";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { IoMdStar } from "react-icons/io";
import { FaRegStarHalfStroke } from "react-icons/fa6"
import { addToCart } from "@/app/actions/actions";
import swal from "sweetalert2";
import Reviews from "../../../app/Components/productReview";
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
         
        </div>
        <p className="leading-relaxed">
        {product.description}
        </p>
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          <div className="flex mr-3 items-center">
            <span className="mr-3 font-extrabold">Color:</span>
            {product.colors}
          </div>
        </div>
        <div className="flex gap-10">
          <span className="title-font font-medium text-2xl text-gray-900">
          <span>₹</span>{product.price}
          </span>
          <button onClick={(e) => handleAddToCart(e, product)} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-extrabold py-2 px-4 rounded-lg shadow-md hover:shadow-lg  hover:scale-110 transition-transform duration-300 ease-out">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
      <Reviews/>
  </div>
</section>

  )
}