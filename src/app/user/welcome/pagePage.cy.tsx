import React from "react";
import Page from "./page";
import "@/app/globals.css";
describe("<Page />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.viewport("macbook-15");
    cy.mount(<Page />);
  });
});
