"use client";

import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { useWallet } from "@solana/wallet-adapter-react";
import { getOrderBySeller, updateOrderStatus } from "@/lib/action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { OrderStatus, User, Product } from "@prisma/client";
import prisma from "../../../../prisma";

interface Order {
  id: string;
  name: string;
  city: string;
  state: string;
  dropOfAddress: string;
  ZipCode: string;
  orderstatus: OrderStatus;
  buyerWallet: string;
  productId: string;
  user: User;
  product: Product;
}

export default function Orders() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    sortBy: "date",
    sortOrder: "desc",
  });
  const [orders, setOrders] = useState<Order[]>([]);

  const { connected, publicKey } = useWallet();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!publicKey) return;
      const data = await getOrderBySeller(publicKey.toString());
      if (data.err) return;
      //@ts-ignore
      setOrders(data?.data);
    };

    fetchOrders();
  }, [publicKey]);

  const updateOrderStatus1 = async (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    const message = await updateOrderStatus(orderId, newStatus);
    if (message.err) {
      toast.warning(message.msg);
      return;
    }

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, orderstatus: newStatus } : order
      )
    );

    toast.info(message.msg);
  };

  const filteredOrders = useMemo(() => {
    let filtered = orders;
    if (filters.status !== "all") {
      filtered = filtered.filter(
        (order) => order.orderstatus === filters.status
      );
    }
    if (filters.sortBy === "date") {
      filtered = filtered.sort((a, b) =>
        filters.sortOrder === "asc"
          ? new Date(a.product.createdAt).getTime() -
            new Date(b.product.createdAt).getTime()
          : new Date(b.product.createdAt).getTime() -
            new Date(a.product.createdAt).getTime()
      );
    } else if (filters.sortBy === "total") {
      filtered = filtered.sort((a, b) =>
        filters.sortOrder === "asc"
          ? Number(a.product.price) - Number(b.product.price)
          : Number(b.product.price) - Number(a.product.price)
      );
    }
    if (search) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(search.toLowerCase()) ||
          order.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return filtered;
  }, [orders, filters, search]);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="w-full rounded-lg bg-background pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="shrink-0">
              <FilterIcon className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]" align="end">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={filters.status}
              onValueChange={(value) =>
                setFilters({ ...filters, status: value })
              }
            >
              <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="PROCESSING">
                Processing
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="SHIPPED">
                Shipped
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="DELIVERED">
                Delivered
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="CANCELLED">
                Cancelled
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={filters.sortBy}
              onValueChange={(value) =>
                setFilters({ ...filters, sortBy: value })
              }
            >
              <DropdownMenuRadioItem value="date">
                Sort by Date
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="total">
                Sort by Total
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Wallet</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders &&
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.product.name}</TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.buyerWallet}</TableCell>
                  <TableCell>
                    <span className="uppercase font-bold">$SOL</span>{" "}
                    {order.product.price}
                  </TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button className="bg-transparent hover:bg-transparent">
                          <Badge
                            variant={
                              order.orderstatus === "PROCESSING"
                                ? "secondary"
                                : order.orderstatus === "SHIPPED"
                                ? "outline"
                                : order.orderstatus === "DELIVERED"
                                ? "default"
                                : "destructive"
                            }
                            className="text-xs"
                          >
                            {order.orderstatus}
                          </Badge>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="min-w-0 p-4 border rounded bg-white">
                        <div className="grid gap-4">
                          <div className="flex flex-col">
                            <Button
                              className="bg-transparent hover:bg-transparent"
                              onClick={() => {
                                updateOrderStatus1(
                                  order.id,
                                  OrderStatus.PROCESSING
                                );
                              }}
                            >
                              <Badge variant="secondary">
                                {OrderStatus.PROCESSING}
                              </Badge>
                            </Button>
                            <Button
                              className="bg-transparent hover:bg-transparent"
                              onClick={() => {
                                updateOrderStatus1(
                                  order.id,
                                  OrderStatus.SHIPPED
                                );
                              }}
                            >
                              <Badge variant="outline">
                                {OrderStatus.SHIPPED}
                              </Badge>
                            </Button>
                            <Button
                              className="bg-transparent hover:bg-transparent"
                              onClick={() => {
                                updateOrderStatus1(
                                  order.id,
                                  OrderStatus.DELIVERED
                                );
                              }}
                            >
                              <Badge variant="default">
                                {OrderStatus.DELIVERED}
                              </Badge>
                            </Button>
                            <Button
                              className="bg-transparent hover:bg-transparent"
                              onClick={() => {
                                updateOrderStatus1(
                                  order.id,
                                  OrderStatus.CANCELLED
                                );
                              }}
                            >
                              <Badge variant="destructive">
                                {OrderStatus.CANCELLED}
                              </Badge>
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function FilterIcon(props: any) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
