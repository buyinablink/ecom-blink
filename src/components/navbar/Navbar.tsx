"use client";
import React from "react";
import { UserSetting } from "./UserSetting";
import { useRouter } from "next/navigation";
import { WalletMultiButtonFix } from "../walletButton/WalletButton";

export default function Navbar() {
  const router = useRouter();
  return (
    <header className=" p-3 flex items-center justify-between border">
      <span
        className="text-2xl uppercase font-semibold cursor-pointer"
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        Ecommerece blink
      </span>
      <div className="flex p-2 gap-4 items-center">
        <WalletMultiButtonFix />
        <UserSetting />
      </div>
    </header>
  );
}
