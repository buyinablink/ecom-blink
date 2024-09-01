import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import idl from "./idl.json";
import type { EcomEscrow } from "./type";
import { getConnection } from "../src/lib/constants";

export const programId = new PublicKey(
  "9pJ1GXPbXQPUvzLJsz3HVSLqQ1rEyxauvZDL5e9aBRx8"
);

const connection = getConnection();

export const program = new Program(idl as EcomEscrow, {
  connection,
});

export type todoState = IdlAccounts<EcomEscrow>["order"];
