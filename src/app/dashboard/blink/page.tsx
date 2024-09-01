"use client";
import BlinkRender from "@/components/blink/blink";
import Loading from "@/components/Loading";
import Navbar from "@/components/navbar/Navbar";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Order() {
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
      {!publicKey && !connected && <Loading />}
      {publicKey && connected && <BlinkRender address={publicKey.toString()} />}
    </div>
  );
}
