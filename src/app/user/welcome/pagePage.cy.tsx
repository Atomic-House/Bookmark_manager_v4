"use client";
import React from "react";
import Page from "./page";
import "@/app/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "../layout";
describe("<Page />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.viewport("macbook-15");
    cy.mount(
      <QueryClientProvider client={new QueryClient()}>
        <RootLayout>
          <Page />
        </RootLayout>
      </QueryClientProvider>,
    );
  });
});
