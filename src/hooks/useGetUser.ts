import { getAllProducts, getSellerBlink, getTheUser } from "@/lib/action";
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
