import React from "react";
import "./Homepage.css"
import Image from "next/image";
import heroi from "@/assets/hero - 1.png";
import logo from "@/assets/logo.svg";
import { WalletMultiButtonFix } from "../walletButton/WalletButton";

function Homepage() {
  return (
    <div>
      <header className="lg:pb-0 sticky top-0 bg-[#2b303b]" style={{zIndex: 9999}}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {/* <!-- lg+ --> */}
            <nav className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
                <a href="#" title="" className="flex">
                <Image width={0} height={0} className="w-auto h-8 lg:h-10" src={logo} alt="" />
                </a>
            </div>
        
            {/* <!-- Hamburger button --> */}
            {/* <button id="menu-toggle" type="button" className="inline-flex p-2 text-white transition-all duration-200 rounded-md lg:hidden focus:bg-[#232323] hover:bg-[#232323]"> */}
                {/* <!-- Menu open: "hidden", Menu closed: "block" --> */}
                {/* <svg id="menu-open-icon" className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> */}
                {/* <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" /> */}
                {/* </svg> */}
        
                {/* <!-- Menu open: "block", Menu closed: "hidden" --> */}
                {/* <svg id="menu-close-icon" className="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> */}
                {/* <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /> */}
                {/* </svg> */}
            {/* </button> */}
        
            {/* <!-- Get started button for lg+ --> */}
            {/* <a href="#" title="" className="items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:inline-flex hover:bg-blue-700 focus:bg-blue-700" role="button">
                Get started now
            </a> */}
            <div className="items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold transition-all duration-200 border border-transparent rounded-md lg:inline-flex ">

              <WalletMultiButtonFix/>
            </div>
            </nav>
        
            {/* <!-- Mobile menu (hidden by default) --> */}
            <nav id="mobile-menu" className="hidden pt-4 pb-6 rounded-md lg:hidden">
            <div className="flow-root">
                <div className="flex flex-col px-6 -my-2 space-y-1 nav-links">
                <a href="#" title="" className="inline-flex py-2 font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">Features</a>
                <a href="#" title="" className="inline-flex py-2 font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">Solutions</a>
                <a href="#" title="" className="inline-flex py-2 font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">Resources</a>
                <a href="#" title="" className="inline-flex py-2 font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">Pricing</a>
                </div>
            </div>
        
            <div className="px-6 mt-6">
                <a href="#" title="" className="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:bg-blue-700" role="button">
                Get started now
                </a>
            </div>
            </nav>
        </div>
    </header>


    <div className="layout-main bg-[#232323] py-6 block pt-5">
        <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-6xl flex flex-wrap lg:flex-nowrap gap-x-6">
                
                <div className="w-full lg:w-1/2 p-8 rounded-xl flex flex-col justify-center bg-no-repeat bg-left bg-contain bg-[#2b303b]">
                    <h1 className="text-3xl mb-4 text-[#cacfd8]">
                        Sign In
                    </h1>
            
                    <p className="medium-info-desc mb-6">
                        Sign in with your wallet for a seamless and hassle-free transaction experience.
                    </p>
            
                    <div className="px-6 sm:px-0">
                        {/* <button type="button" className="w-25 text-white w-full  bg-[#2D47EB] hover:bg-[#2D47EB]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2 max-w-56"> */}
                            {/* <!-- <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"> */}
                                {/* <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                            </svg> --> */}
                            {/* <svg className="mr-2 -ml-1 w-6 h-6" aria-hidden="true" focusable="false" viewBox="0 0 488 496" fill="none" xmlns="http://www.w3.org/2000/svg" 
                            // xmlns:xlink="http://www.w3.org/1999/xlink"
                            >
                                <g clip-path="url(#clip0_240_120)">
                                <path d="M347.022 4H43.3778C19.4209 4 0 23.4209 0 47.3778V351.022C0 374.979 19.4209 394.4 43.3778 394.4H347.022C370.979 394.4 390.4 374.979 390.4 351.022V47.3778C390.4 23.4209 370.979 4 347.022 4Z" fill="white"/>
                                <mask id="mask0_240_120" style={{maskType : "alpha"}} maskUnits="userSpaceOnUse" x="86" y="90" width="218" height="218">
                                <path d="M195.2 307.645C255.093 307.645 303.645 259.092 303.645 199.2C303.645 139.308 255.093 90.7556 195.2 90.7556C135.308 90.7556 86.756 139.308 86.756 199.2C86.756 259.092 135.308 307.645 195.2 307.645Z" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_240_120)">
                                <path d="M299.037 201.64C299.037 194.501 298.405 187.723 297.321 181.126H195.202V221.883H253.672C251.051 235.258 243.369 246.555 231.983 254.236V281.347H266.865C287.289 262.459 299.037 234.626 299.037 201.64Z" fill="#4285F4"/>
                                <path d="M195.203 307.645C224.483 307.645 248.973 297.885 266.866 281.347L231.984 254.236C222.224 260.742 209.843 264.719 195.203 264.719C166.917 264.719 142.968 245.65 134.384 219.895H98.4162V247.819C116.219 283.245 152.819 307.645 195.203 307.645Z" fill="#34A853"/>
                                <path d="M134.384 219.895C132.124 213.388 130.95 206.43 130.95 199.2C130.95 191.97 132.215 185.013 134.384 178.506V150.581H98.4162C91.0059 165.221 86.7584 181.668 86.7584 199.2C86.7584 216.733 91.0059 233.179 98.4162 247.819L134.384 219.895Z" fill="#FBBC05"/>
                                <path d="M195.203 133.681C211.198 133.681 225.477 139.195 236.773 149.948L267.679 119.041C248.973 101.51 224.483 90.7557 195.203 90.7557C152.819 90.7557 116.219 115.156 98.4162 150.581L134.384 178.506C142.968 152.75 166.917 133.681 195.203 133.681Z" fill="#EA4335"/>
                                </g>
                                <rect x="271.11" y="275.111" width="216.889" height="216.889" rx="16.5" fill="url(#pattern0_240_120)"/>
                                </g>
                                <defs>
                                <pattern id="pattern0_240_120" patternContentUnits="objectBoundingBox" width="1" height="1">
                                <use transform="scale(0.0025)"/>
                                </pattern>
                                <clipPath id="clip0_240_120">
                                <rect width="488" height="488" fill="white" transform="translate(0 4)"/>
                                </clipPath>
                                </defs>
                            </svg> */}
                        {/* </button> */}
                        <WalletMultiButtonFix />
                    </div>

                </div>

                <div className="login-hero w-full lg:w-1/2 flex justify-center items-center bg-blue-700 p-6 rounded-xl">
                    <Image width={0} height={0} src={heroi} alt="Payment Illustration" className="rounded-lg w-full h-full object-cover" />
                </div>                  
            </div>
        </div>
    
    </div>



    {/* <!-- Footer --> */}
    <section className="py-10 sm:pt-16 lg:pt-24 bg-[#2c303b]">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
            <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
                <Image width={0} height={0} className="w-auto h-9" src={logo} alt="" />

                <p className="text-base leading-relaxed text-gray-600 mt-7">Simplifies e-commerce by providing an easy way to create and share your store using Solana Blinks. Secure, fast, and reliable for both buyers and sellers.</p>

                <ul className="flex items-center space-x-3 mt-9">
                    <li>
                        <a href="#" title="" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                ></path>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>

            {/* <!-- Sellers --> */}
            <div>
                <p className="text-sm font-semibold tracking-widest uppercase text-[#808388]">Sellers</p>

                <ul className="mt-6 space-y-4 foot-links">
                    <li>
                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Sign In </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Dashboard </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Orders </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Products </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Blinks </a>
                    </li>
                </ul>
            </div>

            {/* <!-- Users --> */}
            <div>
                <p className="text-sm font-semibold tracking-widest uppercase text-[#808389]">Users</p>

                <ul className="mt-6 space-y-4 foot-links">
                    <li>
                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Sign In </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Orders </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Cart </a>
                    </li>

                </ul>
            </div>

            <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
                <p className="text-sm font-semibold tracking-widIest uppercase text-[#808389]">Subscribe to newsletter</p>

                <form action="#" method="POST" className="mt-6">
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input type="email" name="email" id="email" placeholder="Enter your email" className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                    </div>

                    <button type="submit" className="inline-flex items-center justify-center px-6 py-4 mt-3 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700">Subscribe</button>
                </form>
            </div>
        </div>

        <hr className="mt-16 mb-10 border-gray-200" />

        <p className="text-sm text-center text-gray-600">© Copyright 2024, All Rights Reserved by Buy In A Blink</p>
    </div>
    </section>
    </div>
  );
}

export default Homepage;
