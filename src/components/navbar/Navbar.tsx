"use client";
import React from "react";
import { UserSetting } from "./UserSetting";
import { useRouter } from "next/navigation";
import { WalletMultiButtonFix } from "../walletButton/WalletButton";
import logo from "@/assets/logo.svg"
import Image from "next/image";
export default function Navbar() {
  const router = useRouter();
  return (
    // <header className="p-3 flex items-center justify-between border bg-[#2C303B]">
    <header className="flex items-center justify-between p-3 sticky top-0 bg-[#2C303B]">
      <Image width={0} height={0} src={logo} alt="Buy in a Blink" className="w-auto h-8 lg:h-10"/>
      <div className="flex p-2 gap-4 items-center">
        <WalletMultiButtonFix />
        <UserSetting />
      </div>
    </header>
  );
}
