import {
  getAllProducts,
  getRecentOrders,
  getSellerBlink,
  getSellerOrdersOf7Days,
  getTheUser,
} from "@/lib/action";
import { useQuery } from "@tanstack/react-query";

export const useGetSellerDetails = (publicKey: string) => {
  return useQuery({
    queryKey: ["seller-profile", publicKey],
    queryFn: async () => {
      const data = await getTheUser(publicKey);
      return data;
    },
    enabled: !!publicKey,
  });
};

export const useGetSellerHook = (address: string) => {
  return useQuery({
    queryKey: ["seller-blink", address],
    queryFn: async () => {
      const data = await getSellerBlink(address);
      return data;
    },
    enabled: !!address,
  });
};

export const useGetSellerProducts = (address: string) => {
  return useQuery({
    queryKey: ["seller-orders", address],
    queryFn: async () => {
      const data = await getAllProducts(address);
      return data;
    },
    enabled: !!address,
  });
};

export const useGetSellerLast7DaysOrders = (address: string) => {
  return useQuery({
    queryKey: ["seller-last-7-orders", address],
    queryFn: async () => {
      const orders = await getSellerOrdersOf7Days(address);
      return orders;
    },
    enabled: !!address,
  });
};

export const useGetRecentOrders = (address: string) => {
  return useQuery({
    queryKey: ["seller-recent-orders", address],
    queryFn: async () => {
      const orders = await getRecentOrders(address);
      return orders.data;
    },
    enabled: !!address,
  });
};
