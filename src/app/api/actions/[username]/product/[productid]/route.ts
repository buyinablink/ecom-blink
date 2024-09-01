import {
  ActionError,
  ActionPostRequest,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
  MEMO_PROGRAM_ID,
  NextActionLink,
} from "@solana/actions";
import {
  ComputeBudgetProgram,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

import { getConnection } from "@/lib/constants";
import prisma from "prisma/db";

export const OPTIONS = () => {
  return Response.json(null, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const POST = async (
  req: Request,
  {
    params,
  }: {
    params: {
      username: string;
      productid: string;
    };
  }
) => {
  try {
    const url = new URL(req.url);
    console.log("inside post with product id", req.url);
    console.log(params);
    //get the product details
    const body: ActionPostRequest = await req.json();
    console.log(body);
    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (error) {
      return Response.json(
        {
          message: "Invalid public key",
        } as ActionError,
        {
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }

    const product = await prisma.product.findUnique({
      where: {
        id: params.productid,
      },
    });

    if (!product) {
      return Response.json(
        { message: "error while fetchingdata" } as ActionError,
        {
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }
    const connection = getConnection();

    const transaction = new Transaction();
    transaction.add(
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 5000,
      }),
      new TransactionInstruction({
        programId: new PublicKey(MEMO_PROGRAM_ID),
        keys: [],
        data: Buffer.from(JSON.stringify(params), "utf-8"),
      })
    );

    transaction.feePayer = account;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    let next: NextActionLink = {
      type: "inline",
      action: {
        icon:
          product?.imageUrl ||
          "https://avatars.githubusercontent.com/u/37742218?v=4",
        description:
          `${product?.description}, Availale stock ${product?.stock}` ||
          "asdasdasd",
        label: product?.label || "asdasdasd",
        title: `${product?.title}` || "asdasdasdasdasd",
        type: "action",
        links: {
          actions: [
            {
              label: `Purchase product for ${product?.price || "1"} SOL`,
              href: `/api/actions/${params.username}/product/${params.productid}/purchase?name={name}&email={email}&address={address}&state={state}&zipcode={zipcode}&city={city}&amount=${product.price}`,
              parameters: [
                {
                  name: "name",
                  label: "enter your name",
                  required: true,
                  patternDescription: "Ex: JOEY",
                },
                {
                  name: "email",
                  label: "enter your email",
                  required: true,
                  patternDescription: "Ex: hello@xxx.com",
                },
                {
                  name: "address",
                  label: "enter your address",
                  required: true,
                  patternDescription: "Ex: woodland steeet",
                },
                {
                  name: "state",
                  label: "enter your state",
                  required: true,
                  patternDescription: "Ex: ohio",
                },
                {
                  name: "city",
                  label: "enter your city",
                  required: true,
                  patternDescription: "Ex: Cleveland",
                },
                {
                  name: "zipcode",
                  label: "enter your zip code",
                  required: true,
                  patternDescription: "Ex: 44129",
                },
              ],
            },
          ],
        },
      },
    };

    const payload = await createPostResponse({
      fields: {
        transaction,
        message: "",
        links: {
          next,
        },
      },
    });

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Error",
      } as ActionError,
      {
        headers: ACTIONS_CORS_HEADERS,
      }
    );
  }
};
