"use client";
import CreateUsername from "@/components/createusername/CreateUsername";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const route = useRouter();

  const { publicKey, connected } = useWallet();

  useEffect(() => {
    if (!connected && !publicKey) {
      route.push("/");
    }
  }, [connected, publicKey, route]);

  return (
    <div className="flex justify-center items-center h-screen">
      {publicKey && connected && (
        <CreateUsername publickey={publicKey.toString()} />
      )}
    </div>
  );
}
