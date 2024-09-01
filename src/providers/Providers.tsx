"use client";
import { ReactNode } from "react";

import { Toaster } from "sonner";
import { ThemeProvider } from "./theme-provider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { WalletProviders } from "./wallet-provider";
import { EdgeStoreProvider } from "./edgestore";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Toaster position="top-center" richColors closeButton />
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>
          <WalletProviders>
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
          </WalletProviders>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};
