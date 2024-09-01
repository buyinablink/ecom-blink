"use client";

import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Chart from "./chart-bar-default";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Navbar from "../navbar/Navbar";
import { useWallet } from "@solana/wallet-adapter-react";
import { useGetSellerDetails } from "@/hooks/useGetUser";
import { useRouter } from "next/navigation";
import Loading from "../Loading";

export default function DashboardComp() {
  const { publicKey } = useWallet();
  const router = useRouter();
  const { data, isLoading } = useGetSellerDetails(publicKey!.toString());
  if (isLoading) {
    return <Loading />;
  }

  if (!data?.data?.blinkCreated) {
    console.log("inside");
    router.push("/dashboard/blink");
    return;
  }
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 md:gap-8">
        <div className="flex flex-col p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Total Revenue</CardTitle>
                <CardDescription className="text-4xl font-bold">
                  $42,325
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ArrowUpIcon className="h-4 w-4 fill-primary" />
                  <span>+15% from last month</span>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>New Orders</CardTitle>
                <CardDescription className="text-4xl font-bold">
                  124
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ArrowUpIcon className="h-4 w-4 fill-primary" />
                  <span>+10% from last month</span>
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className="border shadow-sm rounded-lg p-2 mt-4">
            <Chart />
          </div>
        </div>
        <div className="border-l bg-muted/40 p-4 md:p-6">
          <div className="flex justify-between  p-3 my-3">
            <p>Recent Orders</p>
            <Link href="/dashboard/orders" className="text-blue-700">
              View More
            </Link>
          </div>

          <div className="border shadow-sm rounded-lg p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-left">Order</TableHead>
                  <TableHead className="min-w-[150px] text-right">
                    Customer
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-left">#3203</TableCell>
                  <TableCell className="text-right">Lisa Anderson</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-left">#3203</TableCell>
                  <TableCell className="text-right">Lisa Anderson</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}

function ArrowUpIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

function MoveHorizontalIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}

function Package2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
