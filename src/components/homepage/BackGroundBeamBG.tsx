"use client";
import React from "react";
import { BackgroundBeams } from "../ui/backgroud-beams";
import { WalletMultiButtonFix } from "../walletButton/WalletButton";

export function BackGroundBeamBG() {
  return (
    <div className="h-screen  w-full  bg-neutral-950 relative flex flex-col items-center justify-center antialiased p-4">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          Blink-Commerce
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-md text-center relative z-10">
          Create your own ecommerce store and make it a blink.
        </p>
      </div>
      <BackgroundBeams />
      <div className="p-4">
        <WalletMultiButtonFix />
      </div>
    </div>
  );
}
