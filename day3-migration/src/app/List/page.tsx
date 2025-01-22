export default function List(){
    return(
        <div className="flex items-center justify-center mt-5 mb-5">
        <div className="flex flex-col gap-8 sm:gap-10 md:flex-row md:gap-12 lg:gap-20">
          <div className="flex flex-col space-y-4">
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">Icons</h1>
            <a href="#" className="text-gray-500 hover:text-gray-700">Air Force 1</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">Huarache</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">Air Max 90</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">Air Max 95</a>
          </div>
          <div className="flex flex-col space-y-4">
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">Shoes</h1>
            <a href="#" className="text-gray-500 hover:text-gray-700">All Shoes</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">Custom Shoes</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">Jordan Shoes</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">Running Shoes</a>
          </div>
          <div className="flex flex-col space-y-4">
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">Clothing</h1>
            <a href="#" className="text-gray-500 hover:text-gray-700">All Clothing</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">Modest Wear</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">Hoodies & Pullovers</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">Shirts & Tops</a>
          </div>
          <div className="flex flex-col space-y-4">
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">Kid's</h1>
            <a href="#" className="text-gray-500 hover:text-gray-700">Infant & Toddler Shoes</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">Kids' Shoes</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">Kids' Jordan Shoes</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">Kids' Basketball Shoes</a>
          </div>
        </div>
      </div>

    )
}