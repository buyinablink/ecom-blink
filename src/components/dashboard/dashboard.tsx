"use client";

import Navbar from "../navbar/Navbar";
import { useWallet } from "@solana/wallet-adapter-react";
import { useGetSellerDetails } from "@/hooks/useGetUser";
import { useRouter } from "next/navigation";
import Loading from "../Loading";
import { getSellerOrdersOf7Days } from "@/lib/action";
import DashBoardRender from "./DashBoardRender";

export default function DashboardComp({ address }: { address: string }) {
  const { publicKey } = useWallet();
  const router = useRouter();
  const { data, isLoading } = useGetSellerDetails(publicKey!.toString());
  if (isLoading) {
    return <Loading />;
  }

  if (!data?.data?.blinkCreated) {
    router.push("/dashboard/blink");
    return null;
  }
  return <>{publicKey && <DashBoardRender address={publicKey.toString()} />}</>;
}
