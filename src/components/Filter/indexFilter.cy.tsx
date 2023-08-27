import React from "react";
import Filter from "./index";
import "@/app/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
describe("<Filter />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <ChakraProvider>
        <Filter />
      </ChakraProvider>,
    );
  });
});
