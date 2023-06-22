"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "@/store/store";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <NextAuthProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </NextAuthProvider>
    </Provider>
  );
}
function NextAuthProvider({ children,session }: { children: React.ReactNode, session: any }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
