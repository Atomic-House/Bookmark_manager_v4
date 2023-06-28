"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NextAuthProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </NextAuthProvider>
      </Provider>
    </QueryClientProvider>
  );
}
function NextAuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
