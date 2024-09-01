"use client";
import React, { useEffect } from "react";
import OrdersTable from "@/components/dashboard/orders/orders-table";
import Navbar from "@/components/navbar/Navbar";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";

export default function Orders() {
  const { connected, publicKey } = useWallet();
  const router = useRouter();
  useEffect(() => {
    if (!connected && !publicKey) {
      router.push("/");
    }
  }, [connected, publicKey, router]);
  return (
    <div>
      <Navbar />
      {publicKey && connected && <OrdersTable />}
    </div>
  );
}
