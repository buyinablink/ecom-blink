import { PublicKey } from "@solana/web3.js";
import { z } from "zod";

export const ProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  label: z.string().min(1, "Label is required"),
  imageUrl: z.string().url("Invalid image URL"),
  price: z.string().min(1, "Price is required"),
  stock: z.string().min(1, "Stock is required"),
  name: z.string().min(1, "Stock is required"),
});

export type ProductInput = z.infer<typeof ProductSchema>;

export const SellerSchema = z.object({
  username: z
    .string()
    .min(7, "Username must be at least 7 characters long")
    .max(30, "Username must not exceed 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),

  walletAddress: z.string().refine(
    (value) => {
      try {
        new PublicKey(value);
        return true;
      } catch (error) {
        return false;
      }
    },
    {
      message: "Invalid address",
    }
  ),
});

export type SellerInput = z.infer<typeof SellerSchema>;

export const UserSchema = z.object({
  walletAddress: z.string().refine(
    (value) => {
      try {
        new PublicKey(value);
        return true;
      } catch (error) {
        return false;
      }
    },
    {
      message: "Invalid address",
    }
  ),
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must not exceed 100 characters"),
  emailAddress: z.string().email("Invalid email address"),
});

export type UserInput = z.infer<typeof UserSchema>;

export const SellerBlinkSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required and cannot be empty." }),
  icon: z.string().min(1, { message: "Icon is required and cannot be empty." }),
  description: z
    .string()
    .min(1, { message: "Description is required and cannot be empty." }),
  label: z
    .string()
    .min(1, { message: "Label is required and cannot be empty." }),
  sellerWallet: z.string().refine(
    (value) => {
      try {
        new PublicKey(value);
        return true;
      } catch (error) {
        return false;
      }
    },
    {
      message: "Invalid address",
    }
  ),
});

export type SellerBlinkInput = z.infer<typeof SellerBlinkSchema>;
