import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"], // bold for headings
});

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      
      {/* Left side - Login Form */}
      <section className="w-full md:w-1/2 bg-[#003F2a] p-12 flex flex-col items-center justify-center">
        
        {/* Title + subtitle */}
        <Image
            src="/mathsoc-logo-longform.svg"
            alt="MathSoc Logo"
            width={150}
            height={50}
            className="h-22 w-auto invert pb-6"
            priority
        />

        <h2 className="pt-6 font-bold text-2xl text-white">Welcome Back!</h2>
        <p className="mt-4 text-white">
          If you are already a member, easily log in
        </p>

        {/* Login form */}
        <form action="" className="flex flex-col gap-4 w-full max-w-md">
          <input
            className="p-2 mt-8 rounded-xl border text-gray-800 bg-white"
            type="email"
            name="email"
            placeholder="Email..."
          />

          <div className="relative">
            <input
              className="p-2 rounded-xl border w-full text-gray-900 bg-white"
              type="password"
              name="password"
              placeholder="Password..."
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
            </svg>
          </div>

          <div className="text-xs border-white py-4 text-white w-full max-w-md text-center">
            <p className="underline cursor-pointer">Forgot your password?</p>
          </div>

          <button className="bg-[#009965] hover:bg-[#028358] rounded-xl px-18 py-2  text-white hover:scale-105 duration-300 self-center">
            Login
          </button>
          
        </form>

        <div className="mt-3 text-xs flex items-center justify-center text-white w-full max-w-md gap-2">
          <p>Don&apos;t have an account?</p>
          <a className="text-[#009966] rounded-xl hover:scale-110 duration-300 underline font-bold">
            Sign Up
          </a>
        </div>

        {/* Divider with OR */}
        <div className="mt-6 grid grid-cols-3 items-center text-gray-400 w-full max-w-md">
          <hr className="border-white" />
          <p className="text-white text-center text-sm">OR</p>
          <hr className="border-white" />
        </div>
        
        {/* Google login button */}
        <button className="bg-white border py-2 rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-101 hover:bg-gray-200 duration-300 text-black w-full max-w-md">
          <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
          </svg>
          Login with Google
        </button>

      </section>
      
      {/* Right side - Calendar */}
      <section className="hidden md:flex md:w-1/2 bg-white p-12 flex-col items-center justify-center">
        <h2
          className={`${montserrat.className} text-[24px] font-bold text-center text-gray-900 mb-6`}
        >
          Interview Scheduler
        </h2>
        <Image
          src="/calendar.png"
          alt="Calendar"
          width={400}
          height={400}
          className="object-contain"
        />
      </section>
    </div>
  );
}