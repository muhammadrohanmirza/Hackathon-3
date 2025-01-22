import Image from "next/image"
import logo from "../../../Assets/logo2.png"
import tick from "../../../Assets/tick.png"
import Link from "next/link"
export default function SignIn(){
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-md shadow-md">
          <div className="text-center">
            <Image
              className="mx-auto h-12 w-auto"
              src={logo} // Replace with the actual path to the Nike logo
              alt="Nike Logo"
            />
            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
              YOUR ACCOUNT FOR EVERYTHING NIKE
            </h2>
          </div>
  
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
  
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                  Keep me signed in
                </label>
              </div>
  
              <div className="text-sm">
                <a href="#" className="font-medium text-black hover:underline">
                  Forgotten your password?
                </a>
              </div>
            </div>
  
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                SIGN IN
              </button>
            </div>
  
            <div className="text-center mt-6 text-sm text-gray-600">
              <p>
                By logging in, you agree to Nike's{' '}
                <a href="#" className="text-black hover:underline">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="#" className="text-black hover:underline">
                  Terms of Use
                </a>
                .
              </p>
            </div>
  
            <div className="text-center mt-4">
              <p className="text-sm text-gray-900">
                Not a Member?{' '}
                <a href="/Join" className="text-black font-medium hover:underline">
                  Join Us.
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    )
}