import {
  ActionError,
  ACTIONS_CORS_HEADERS,
  CompletedAction,
  NextActionPostRequest,
} from "@solana/actions";
import { PublicKey } from "@solana/web3.js";

import { getConnection } from "@/lib/constants";
import { trimUuidToHalf } from "@/lib/helpers";
import { program, programId } from "anchor/setup";
import prisma from "prisma/db";

export const GET = async (req: Request) => {
  return Response.json({ message: "Method not supported" } as ActionError, {
    status: 403,
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const OPTIONS = async () =>
  Response.json(null, { headers: ACTIONS_CORS_HEADERS });

export const POST = async (req: Request) => {
  try {
    const url = new URL(req.url);
    console.log(url.searchParams.keys());
    const body: NextActionPostRequest = await req.json();
    console.log("body:", body);

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

    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const address = searchParams.get("address");
    const zipcode = searchParams.get("zipcode");
    const city = searchParams.get("city");
    const amount = searchParams.get("amount");
    const state = searchParams.get("state");
    const productid = searchParams.get("productid");
    const uuid = searchParams.get("uuid");
    if (
      !name ||
      !email ||
      !address ||
      !zipcode ||
      !city ||
      !amount ||
      !state ||
      !productid ||
      !uuid
    ) {
      return Response.json(
        {
          message: "Incomeplete data",
        } as ActionError,
        {
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }

    const connection = getConnection();
    //10secs adasd
    try {
      let status = await connection.getSignatureStatus(signature);

      if (!status) throw "Unknown signature status";

      // only accept `confirmed` and `finalized` transactions
      if (status.value?.confirmationStatus) {
        if (
          status.value.confirmationStatus != "confirmed" &&
          status.value.confirmationStatus != "finalized"
        ) {
          throw "Unable to confirm the transaction";
        }
      }
      const transaction = await connection.getParsedTransaction(
        signature,
        "confirmed"
      );

      let message = trimUuidToHalf(uuid); //15 chracters
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

      if (transaction) {
        const accounts = transaction.transaction.message.accountKeys;
        console.log("transaction account which are included", accounts);
        let programAccount = accounts.find((acc) =>
          acc.pubkey.equals(programId)
        );
        let signerAccount = accounts.find((acc) => acc.pubkey.equals(account));
        let orderPdaAccount = accounts.find((acc) =>
          acc.pubkey.equals(orderPda)
        );
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
              headers: ACTIONS_CORS_HEADERS,
            }
          );
        }

        const user = await prisma.user.findUnique({
          where: {
            userWallet: body.account,
          },
        });

        if (!user) {
          await prisma.user.create({
            data: {
              emailAddress: email,
              name,
              userWallet: body.account,
            },
          });
        }
        const productDetails = await prisma.product.findUnique({
          where: {
            id: productid,
          },
          include: {
            seller: true,
          },
        });

        if (!productDetails) {
          return;
        }
        await prisma.order.create({
          data: {
            name,
            city,
            dropOfAddress: address,
            state,
            ZipCode: zipcode,
            buyerWallet: body.account,
            productId: productid,
            orderstatus: "PROCESSING",
            id: uuid,
            sellerId: productDetails.sellerId,
          },
        });

        let updatedStock = Number(productDetails?.stock) - 1;
        await prisma.product.update({
          where: {
            id: productid,
          },
          data: {
            stock: updatedStock.toString(),
          },
        });

        const payload: CompletedAction = {
          type: "completed",
          title: `purchase was successful! login with your address in our website to check out the orders`,
          icon: "https://avatars.githubusercontent.com/u/35608259?s=200&v=4",
          label: "Complete!",
          description:
            `You have now completed an action chain! ` +
            `Here was the signature from the last action's transaction: ${signature} `,
        };

        return Response.json(payload, {
          headers: ACTIONS_CORS_HEADERS,
        });
      }

      console.log("transaction: ", transaction);

      const payload: CompletedAction = {
        type: "completed",
        title: `purchase failed! contact us at help@support.us`,
        icon: "https://avatars.githubusercontent.com/u/35608259?s=200&v=4",
        label: "Complete!",
        description:
          `You have now completed an action chain! ` +
          `Here was the signature from the last action's transaction: ${signature} `,
      };

      return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS,
      });
    } catch (err) {
      if (typeof err == "string") throw err;
      throw "Unable to confirm the provided signature";
    }
  } catch (err) {
    console.log(err);
    let actionError: ActionError = { message: "An unknown error occurred" };
    if (typeof err == "string") actionError.message = err;
    return Response.json(actionError, {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
};
