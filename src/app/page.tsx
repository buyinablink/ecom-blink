"use client";
import Homepage from "@/components/homepage/Homepage";
import { chechSellerPresent, checkSellerUsername } from "@/lib/action";

import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Home() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  const fetchUsername = async (publicKey: string) => {
    const data = await chechSellerPresent(publicKey);
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (connected && publicKey) {
        const value = await fetchUsername(publicKey.toString());
        console.log(value);
        if (!value.err && !value.user) {
          router.push("/username");
          toast.info("create username");
          return;
        }
        if (!value.err && value.user) {
          router.push("/dashboard");
          toast.info("logged in successfully");
          return;
        }
        toast.warning(value.err);
      }
    };
    fetchData();
  }, [publicKey, connected, router]);
  return <Homepage />;
}
