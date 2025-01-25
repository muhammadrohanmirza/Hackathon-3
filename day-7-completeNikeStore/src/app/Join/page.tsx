import Image from "next/image"
import logo from "../../../Assets/logo2.png"
// import box from "../../../Assets/box.png"
import Link from "next/link"


export default function Join() {
    return (
        <div className="min-h-screen pt-20 pb-20 flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-md shadow-md">
        <div className="text-center">
          <Image
            className="mx-auto h-12 w-auto"
            src={logo} // Replace with the actual path to the Nike logo
            alt="Nike Logo"
          />
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            BECOME A NIKE MEMBER
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create your Nike Member profile and get first access to the very best of Nike products, inspiration, and community.
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
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
                className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="first-name" className="sr-only">
                First Name
              </label>
              <input
                id="first-name"
                name="first-name"
                type="text"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="First Name"
              />
            </div>
            <div>
              <label htmlFor="last-name" className="sr-only">
                Last Name
              </label>
              <input
                id="last-name"
                name="last-name"
                type="text"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="Last Name"
              />
            </div>
            <div>
              <label htmlFor="dob" className="sr-only">
                Date of Birth
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="Date of Birth"
              />
              <p className="mt-1 text-xs text-gray-500">
                Get a Nike Member Reward every year on your Birthday.
              </p>
            </div>
            <div>
              <label htmlFor="last-name" className="sr-only">
                country
              </label>
              <input
                id="country"
                name="pakistan"
                type="text"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="Country"
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  id="male"
                  name="gender"
                  type="radio"
                  value="male"
                  className="h-4 w-4 text-black focus:ring-black border-gray-300"
                />
                <label htmlFor="male" className="ml-2 text-sm text-gray-900">
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="female"
                  name="gender"
                  type="radio"
                  value="female"
                  className="h-4 w-4 text-black focus:ring-black border-gray-300"
                />
                <label htmlFor="female" className="ml-2 text-sm text-gray-900">
                  Female
                </label>
              </div>
            </div>
            <div className="flex items-start">
              <input
                id="updates"
                name="updates"
                type="checkbox"
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label htmlFor="updates" className="ml-2 text-sm text-gray-900">
                Sign up for emails to get updates from Nike on products, offers, and your Member benefits.
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              JOIN US
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-900">
              Already a Member?{' '}
              <Link href="/SignIn" className="text-black font-medium hover:underline">
                Sign In.
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
    )
}