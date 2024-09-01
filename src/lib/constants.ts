import { clusterApiUrl, Connection } from "@solana/web3.js";

export const getConnection = () => {
  const connection = new Connection(
    process.env.NEXT_PUBLIC_RPC_END_POINT || clusterApiUrl("devnet"),
    "confirmed"
  );

  return connection;
};
