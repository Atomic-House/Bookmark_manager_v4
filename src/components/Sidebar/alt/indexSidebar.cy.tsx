import React from "react";
import Sidebar from "./index";
import "@/app/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
describe("<Sidebar />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.viewport("macbook-15");
    cy.mount(
      // <ChakraProvider>
      <Sidebar>Rest of the app here</Sidebar>,
      // </ChakraProvider>,
    );
  });
});
