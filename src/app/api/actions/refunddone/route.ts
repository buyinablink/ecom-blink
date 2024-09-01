import {
  ActionError,
  CompletedAction,
  createActionHeaders,
  NextActionPostRequest,
} from "@solana/actions";
import {
  ParsedMessageAccount,
  ParsedTransactionMeta,
  PublicKey,
} from "@solana/web3.js";
import { getConnection } from "@/lib/constants";
import { trimUuidToHalf } from "@/lib/helpers";
import prisma from "prisma/db";
import { program, programId } from "anchor/setup";

const headers = createActionHeaders();

export const GET = async (req: Request) => {
  return Response.json({ message: "Method not supported" } as ActionError, {
    status: 403,
    headers,
  });
};

export const OPTIONS = async () => Response.json(null, { headers });

export const POST = async (req: Request) => {
  try {
    const body: NextActionPostRequest = await req.json();
    console.log("body:", body);
    const url = new URL(req.url);
    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (err) {
      throw 'Invalid "account" provided';
    }

    let signature: string;
    try {
      signature = body.signature;
      if (!signature) throw "Invalid signature";
    } catch (err) {
      throw 'Invalid "signature" provided';
    }
    const searchParams = new URLSearchParams(url.search);

    const orderId = searchParams.get("orderid");

    if (!orderId) {
      return Response.json(
        {
          message: "something went wrong",
        } as ActionError,
        {
          status: 400,
          headers,
        }
      );
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        product: true,
      },
    });

    if (!order) {
      return Response.json(
        {
          message: "something went wrong",
        } as ActionError,
        {
          status: 400,
          headers,
        }
      );
    }

    const connection = getConnection();
    const transaction = await connection.getParsedTransaction(
      signature,
      "confirmed"
    );
    let message = trimUuidToHalf(orderId);
    let orderPda = PublicKey.findProgramAddressSync(
      [
        Buffer.from("order"),
        new PublicKey(body.account).toBuffer(),
        Buffer.from(message),
      ],
      program.programId
    )[0];

    let orderVault = PublicKey.findProgramAddressSync(
      [Buffer.from("orderVault"), orderPda.toBuffer()],
      program.programId
    )[0];
    console.log("thse are the pdas", orderPda, orderVault);

    if (transaction) {
      const accounts = transaction.transaction.message.accountKeys;
      console.log("transaction account which are included", accounts);

      let programAccount = accounts.find((acc) => acc.pubkey.equals(programId));
      let signerAccount = accounts.find((acc) => acc.pubkey.equals(account));
      let orderPdaAccount = accounts.find((acc) => acc.pubkey.equals(orderPda));
      let orderVaultAccount = accounts.find((acc) =>
        acc.pubkey.equals(orderVault)
      );

      if (
        !programAccount ||
        !signerAccount ||
        !orderPdaAccount ||
        !orderVaultAccount
      ) {
        return Response.json(
          {
            message: "Something went wwrong",
          } as ActionError,
          {
            headers,
          }
        );
      }
      await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          orderstatus: "CANCELLED",
        },
      });
      const payload: CompletedAction = {
        type: "completed",
        title: `refund was successful! Checkout your wallet`,
        icon: "https://avatars.githubusercontent.com/u/35608259?s=200&v=4",
        label: "Complete!",
        description:
          `You have now completed an action chain! ` +
          `Here was the signature from the last action's transaction: ${signature} `,
      };

      return Response.json(payload, {
        headers,
      });
    }
    const payload: CompletedAction = {
      type: "completed",
      title: `refund failed! Contacts us at hello@support.us`,
      icon: "https://avatars.githubusercontent.com/u/35608259?s=200&v=4",
      label: "Complete!",
      description:
        `You have now completed an action chain! ` +
        `Here was the signature from the last action's transaction: ${signature} `,
    };

    return Response.json(payload, {
      headers,
    });
  } catch (err) {
    console.log(err);
    let actionError: ActionError = { message: "An unknown error occurred" };
    if (typeof err == "string") actionError.message = err;
    return Response.json(actionError, {
      status: 400,
      headers,
    });
  }
};

// if (order ++delivered){
//   claim

//   program.methods.finalizeOrder()
// }

// if(order is delivered){
//   // claim for seller call the instruction with the seller key
// }
