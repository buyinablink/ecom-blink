import dynamic from "next/dynamic";

export const WalletMultiButtonFix = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  {
    ssr: false,
    loading: () => <div className=" p-5  rounded-lg">Loading...</div>,
  }
);
