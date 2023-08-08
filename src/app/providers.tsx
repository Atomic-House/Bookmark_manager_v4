//Contains all our providers needed for the app
"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NextAuthProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </NextAuthProvider>
      </Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
function NextAuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
