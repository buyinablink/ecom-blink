"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { SellerInput, SellerSchema } from "@/lib/validation";
import { createSeller } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function CreateUsername({ publickey }: { publickey: string }) {
  const [username, setUsername] = useState("");
  const [wallet] = useState(publickey);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Wallet:", wallet);

    try {
      if (!username || !wallet) {
        toast.warning("Enter the username");
        return;
      }

      if (username.length < 7) {
        toast.warning("username lenght should be more than 6 letters");
        return;
      }
      const formData: SellerInput = {
        username,
        walletAddress: wallet,
      };
      let data = await SellerSchema.parse(formData);
      const response = await createSeller(data);
      console.log(response);
      if (response.err) {
        toast.warning(response.msg);
        return;
      }
      localStorage.setItem("username", data.username);
      router.push("/dashboard");
    } catch (error) {}
  };

  return (
    <Card className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Connect Your Wallet</CardTitle>
          <CardDescription>
            Enter your username and wallet address to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Handle username input
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wallet">Wallet Address</Label>
            <Input
              id="wallet"
              placeholder="Enter your wallet address"
              value={wallet}
              readOnly // Make the input read-only
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="ml-auto">
            Create
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
