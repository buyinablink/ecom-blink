"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getTheUser } from "@/lib/action";
import { useWallet } from "@solana/wallet-adapter-react";

export function UserSetting() {
  const router = useRouter();
  const {publicKey, connected} = useWallet()
  const [userData, setUserData] = useState<any>(null)
  useEffect(() => {
    (async() => {
      if(publicKey) {
        const userData = await getTheUser(publicKey.toString())
        if(userData.err) return;
        setUserData(userData.data)
        console.log(userData.data)
      }
    })()
  }, [])
  return (
    connected && publicKey && userData &&
        <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-11 w-11 border">
                <AvatarImage src={`https://robohash.org/${userData.walletAddress}?set=set4`} alt="@shadcn" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2 w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Your Account</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userData.username}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  router.push("/dashboard");
                }}
              >
                DashBoard
              </DropdownMenuItem>
    
              <DropdownMenuItem
                onClick={() => {
                  router.push("/dashboard/blink");
                }}
              >
                Your Blink
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  router.push("/dashboard/orders");
                }}
              >
                Orders
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  router.push("/dashboard/products");
                }}
              >
                Products
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
  );
}
