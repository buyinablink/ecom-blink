import {
  ActionError,
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
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

export const GET = async (
  req: Request,
  {
    params,
  }: {
    params: {
      username: string;
    };
  }
) => {
  try {
    const seller = await prisma.seller.findUnique({
      where: {
        username: params.username,
      },
      include: {
        blink: true,
      },
    });

    if (!seller || !seller.blinkCreated || !seller.blink) {
      return Response.json(
        {
          message: "User not found",
        } as ActionError,
        {
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }

    const payload: ActionGetResponse = {
      icon: seller.blink.icon,
      // icon: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGJvaGNnMXBtbmp4bjJ0NXlqYmFvaWlhamlqbWs3dXJqeG42emdpcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9dg/fVWFdoP5SoThCSQOpb/giphy-downsized-large.gif",
      title: seller.blink.title,
      label: seller.blink.label,
      description: seller.blink.description,
      links: {
        actions: [
          {
            href: `/api/actions/${params.username}?navigate=products`,
            label: "checkout to products",
          },
          {
            href: `/api/actions/${params.username}?navigate=orders`,
            label: "check your orders",
          },
        ],
      },
    };

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (error) {
    console.log(error);
    return Response.json(null, {
      headers: ACTIONS_CORS_HEADERS,
    });
  }
};

export const OPTIONS = GET;

export const POST = async (req: Request, { params }: any) => {
  try {
    const url = new URL(req.url);
    let route = url.searchParams.get("navigate");

    if (!route) return;

    const seller = await prisma.seller.findUnique({
      where: {
        username: params.username,
      },
      include: {
        blink: true,
      },
    });

    if (!seller || !seller.blinkCreated || !seller.blink) {
      return Response.json(
        {
          message: "User not found",
        } as ActionError,
        {
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }

    const body: ActionPostRequest = await req.json();

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
    console.log("fetch product");
    /// fetch his products from the db
    const products = await prisma.product.findMany({
      where: {
        sellerId: seller.walletAddress,
      },
    });

    console.log(products.length);
    // fetch his order from db
    const orders = await prisma.order.findMany({
      where: {
        buyerWallet: body.account,
        orderstatus: "PROCESSING",
      },
      include: {
        product: true,
      },
    });

    let nextLink: NextActionLink = {
      type: "inline",
      action: {
        icon: "",
        description: "",
        label: "",
        title: "",
        type: "action",
        links: {
          actions: [],
        },
      },
    };
    // let nextLink: NextActionLink;
    if (route == "products") {
      nextLink = {
        type: "inline",
        action: {
          icon: seller.blink.icon,
          description: seller.blink.description,
          label: seller.blink.label,
          title: seller.blink.title,
          type: "action",
          links: {
            actions: products.map((data) => ({
              label: `${data.name}`,
              href: `/api/actions/${params.username}/product/${data.id}`,
            })),
          },
        },
      };
    } else if (route == "orders") {
      if (orders.length == 0) {
        nextLink = {
          type: "inline",
          action: {
            type: "completed",
            icon: "https://imgs.search.brave.com/mTigptQqts4F_6klqySaDOFw3rN35C_WULPGgqdB1Jg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMy/NjE5NjkyMS9waG90/by9vcGVuZWQtZW1w/dHktY2FyZGJvYXJk/LWJveC1vbi1ncmVl/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9d1k3eUpiZjFB/WDhuLXNMb2lpRHNI/c1pfS2RBRXpGdW40/RWpoczJnQXZhWT0",
            title: "You dont have any orders",
            description: "please buy from someones invenotory to check orders",
            label: "nothing to show here",
          },
        };
      } else {
        nextLink = {
          type: "inline",
          action: {
            icon: seller.blink.icon,
            description:
              "orders with only processing can be viewed here, and can be cancelled",
            label: "you can check your processing orders and can cancel them",
            title: "Check out your orders",
            type: "action",
            links: {
              actions: orders.map((data) => ({
                href: `/api/actions/${params.username}/orders/${data.id}`,
                label: `${data.product.name}`,
              })),
            },
          },
        };
      }
    }
    const connection = getConnection();
    const transaction = new Transaction();
    transaction.add(
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 5,
      }),
      new TransactionInstruction({
        programId: new PublicKey(MEMO_PROGRAM_ID),
        keys: [],
        data: Buffer.from(route, "utf-8"),
      })
    );

    transaction.feePayer = account;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    console.log("in here before ceate reposonse");
    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: "all good",
        links: {
          //@ts-ignore
          next: nextLink,
        },
      },
    });
    console.log("response returned", nextLink);
    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (error) {
    console.log("inside error");
    return Response.json(
      {
        message: "something went wrong",
      } as ActionError,
      {
        headers: ACTIONS_CORS_HEADERS,
      }
    );
  }
};
