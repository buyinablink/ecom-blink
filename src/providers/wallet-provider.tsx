"use client";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useMemo } from "react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

export function WalletProviders({ children }: { children: React.ReactNode }) {
  const network = WalletAdapterNetwork.Devnet;
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);
  console.log("end point is");
  return (
    <ConnectionProvider
      endpoint={
        process.env.NEXT_PUBLIC_RPC_END_POINT || clusterApiUrl("devnet")
      }
    >
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
