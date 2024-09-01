"use server";

import prisma from "prisma/db";
import {
  ProductInput,
  SellerBlinkInput,
  SellerInput,
  UserInput,
} from "./validation";

import {
  subDays,
  startOfDay,
  endOfDay,
  format,
  eachDayOfInterval,
} from "date-fns";

export const createSellerProduct = async (
  sellerWalet: string,
  productData: ProductInput
) => {
  try {
    const seller = await prisma.seller.findUnique({
      where: {
        walletAddress: sellerWalet,
      },
    });

    if (!seller) {
      return {
        message: "seller not present cant add the product",
      };
    }

    let product = await prisma.product.create({
      data: {
        ...productData,
        sellerId: seller.walletAddress,
      },
    });

    return {
      msg: "product created sucessfully",
      product,
      err: false,
    };
  } catch (error) {
    return {
      msg: "something went wrong while creating product",
      err: true,
    };
  }
};

export const createSeller = async (sellerData: SellerInput) => {
  try {
    const sellerExists = await prisma.seller.findUnique({
      where: {
        walletAddress: sellerData.walletAddress,
      },
    });

    if (sellerExists) return { msg: "username already taken", err: true };

    const seller = await prisma.seller.create({
      data: sellerData,
    });

    return {
      msg: "Account created successfully",
      seller,
      err: false,
    };
  } catch (error) {
    return {
      msg: "something went wrong while creting seller account",
      err: true,
    };
  }
};

export const doNothing = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("inside server action");
    return { msg: "hello" };
  } catch (error) {
    return { msg: "error", err: true };
  }
};

export const createUser = async (userData: UserInput) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        userWallet: userData.walletAddress,
      },
    });
    if (user) {
      return {
        msg: "user already present",
        err: true,
      };
    }

    const newUser = await prisma.user.create({
      data: {
        emailAddress: userData.emailAddress,
        userWallet: userData.walletAddress,
        name: userData.name,
      },
    });

    return {
      msg: "User created successfully",
      err: false,
      newUser,
    };
  } catch (error) {
    return {
      msg: "error",
      err: true,
    };
  }
};

export const createSellerBlink = async (sellerBlinkData: SellerBlinkInput) => {
  try {
    const seller = await prisma.seller.findUnique({
      where: {
        walletAddress: sellerBlinkData.sellerWallet,
      },
    });

    if (!seller) return { msg: "first create a seller account", err: true };

    if (seller.blinkCreated) {
      return {
        msg: "You've already created your blink go and update",
        err: true,
      };
    }

    const sellerBlink = await prisma.sellerBlink.create({
      data: sellerBlinkData,
    });

    await prisma.seller.update({
      where: {
        walletAddress: seller.walletAddress,
      },
      data: {
        blinkCreated: true,
      },
    });

    return {
      msg: "Created blink for the user",
      data: sellerBlink,
      err: false,
    };
  } catch (error) {
    return { msg: "something went wrong while creating blink", err: true };
  }
};

export const checkSellerUsername = async (username?: string) => {
  try {
    if (!username) {
      return {
        msg: "username inpur required",
        err: true,
      };
    }
    const data = await prisma.seller.findUnique({
      where: {
        username,
      },
    });

    if (data) {
      return {
        msg: "username already taken",
        err: true,
      };
    }

    return {
      msg: "Username not created yet",
      err: false,
    };
  } catch (error) {
    return {
      msg: "SOmething went wrong",
      err: true,
    };
  }
};

export const chechSellerPresent = async (address: string) => {
  try {
    if (!address) {
      return {
        msg: "username inpur required",
        err: true,
        user: false,
      };
    }
    const data = await prisma.seller.findUnique({
      where: {
        walletAddress: address,
      },
    });

    if (!data) {
      return {
        msg: "seller not present",
        user: false,
        err: false,
      };
    }

    return {
      msg: "seller  present",
      err: false,
      user: data,
    };
  } catch (error) {
    return {
      msg: "SOmething went wrong",
      err: true,
    };
  }
};

export const getTheUser = async (address: string) => {
  try {
    const user = await prisma.seller.findUnique({
      where: {
        walletAddress: address,
      },
    });

    if (!user) {
      return {
        msg: "There is no seller present in the db",
        err: true,
      };
    }

    return {
      msg: "successfully fetched",
      err: false,
      data: user,
    };
  } catch (error) {
    return {
      msg: "Something went wrong",
      err: true,
    };
  }
};

export const getSellerBlink = async (address: string) => {
  try {
    const data = await prisma.sellerBlink.findUnique({
      where: {
        sellerWallet: address,
      },
    });

    if (!data) {
      return {
        msg: "seller havent created a blink yet",
        err: true,
        blink: null,
      };
    }

    return {
      msg: "Sucessfully fetched",
      err: false,
      blink: data,
    };
  } catch (error) {
    return {
      msg: "SOmething went wrong",
      err: true,
      blink: null,
    };
  }
};

interface UpdateInput {
  title?: string;
  description?: string;
  label?: string;
  icon?: string;
}

export const updateSellerBlink = async (data: UpdateInput, address: string) => {
  try {
    const blink = await prisma.sellerBlink.findUnique({
      where: {
        sellerWallet: address,
      },
    });

    if (!blink) {
      return {
        msg: "User wallet not found",
        err: true,
      };
    }
    const updatedBlink = await prisma.sellerBlink.update({
      where: {
        sellerWallet: address,
      },
      data,
    });
    console.log(updatedBlink);

    return {
      msg: "Successfully Updated",
      err: false,
    };
  } catch (error) {
    console.log(error);
    return {
      msg: "Update went wrong",
      err: false,
    };
  }
};

export const getAllProducts = async (pubkey: any) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        sellerId: pubkey,
      },
    });
    return {
      msg: "successfully fetched",
      err: false,
      data: products,
    };
  } catch (error) {
    return {
      msg: "Something went wrong",
      err: true,
    };
  }
};

export const editProduct = async (
  productId: string,
  productData: ProductInput
) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return {
        msg: "product not present",
        err: true,
      };
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: productData,
    });

    return {
      msg: "product updated successfully",
      err: false,
      data: updatedProduct,
    };
  } catch (error) {
    return {
      msg: "Something went wrong",
      err: true,
    };
  }
};

export const updateOrderStatus = async (orderId: string, newStatus: any) => {
  try {
    await prisma.order.update({
      where: {
        id: orderId.toString(),
      },
      data: {
        orderstatus: newStatus as any,
      },
    });
    console.log(orderId);
    // revalidatePath("/dashboard/orders")
    return {
      msg: "Order status updated successfully",
      err: false,
    };
  } catch (e) {
    return {
      msg: `Something went wrong, ${e}`,
      err: true,
    };
  }
};

export const getOrderBySeller = async (sellerId: string) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        product: {
          sellerId,
        },
      },
      include: {
        user: true,
        product: true,
      },
    });
    return {
      msg: "successfully fetched",
      err: false,
      data: orders,
    };
  } catch (e) {
    return {
      msg: "Something went wrong",
      err: true,
    };
  }
};

export async function getSellerOrdersOf7Days(sellerAddress: string) {
  // Get today's date and the date 7 days ago
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 6); // 7 days including today

  // Initialize the result object with zero counts for each of the last 7 days
  const result: { [key: string]: number } = {};
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  days.forEach((day) => {
    const formattedDate = format(day, "yyyy-MM-dd");
    result[formattedDate] = 0;
  });

  // Fetch orders for the specific seller within the last 7 days
  const orders = await prisma.order.findMany({
    where: {
      sellerId: sellerAddress,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  // Update the result object with the count of orders per day
  let totalOrders = 0;
  orders.forEach((order) => {
    const day = format(order.createdAt, "yyyy-MM-dd");
    result[day] += 1;
    totalOrders += 1;
  });

  // Convert result object to the desired format
  const formattedResult = Object.entries(result).map(([date, count]) => ({
    date,
    orders: count,
  }));

  return {
    totalOrders,
    dailyCounts: formattedResult,
  };
}
