"use client";
import Products from "@/components/dashboard/products/products";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function OrderList() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  useEffect(() => {
    if (!publicKey || !connected) {
      router.push("/");
    }
  }, [publicKey, connected]);

  return <div>{publicKey && <Products address={publicKey.toString()} />}</div>;
}
