'use client'
export default function ContactInfo(){
    return(
        <div className="p-4">
        <h3 className="text-lg font-semibold mt-6 mb-4">What's your contact information?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Email"
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <p className='text-gray-400'>A confirmation email will be sent after checkout.</p>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
              type="tel"
              placeholder="Phone Number"
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <p className='text-gray-400'>A carrier might contact you to confirm delivery.</p>

          <h3 className="text-lg font-semibold mt-6 mb-4">What's your PAN?</h3>
          <input
            type="text"
            placeholder="PAN"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          
          />
          <p className='text-gray-400'>Enter your PAN to enable payment with UPI, Net Banking or local card methods</p>
          <div className="mt-4 flex items-center">
            <input type="checkbox" id="savePAN" className="mr-2" />
            <label htmlFor="savePAN" className='text-gray-400'>Save PAN details to Nike Profile</label>
          </div>
          <div className="mt-10 flex items-center">
            <input type="checkbox" id="savePAN" className="mr-2" />
            <label htmlFor="savePAN" className='text-gray-400'>I have read and consent to eShopWorld processing my information in accordance with the Privacy Statement and Cookie Policy. eShopWorld is a trusted Nike partner.</label>
          </div>
          <div className="mt-6">
            <button className="w-full h-[50px] bg-gray-400 text-white py-2 rounded-3xl">Continue</button>
          </div>
          <div className='mt-10'>
            <div className=' text-xl h-[80px] border-t border-gray-400 '>Delivery</div>
            <div className=' text-xl h-[80px] border-t border-gray-400 text-gray-400'>Shipping</div>
            <div className=' text-xl h-[80px] border-t border-gray-400 text-gray-400'>Billing</div>
            <div className=' text-xl h-[80px] border-t border-gray-400 text-gray-400'>Payment</div>
          </div>
        </div>
        
    )
}