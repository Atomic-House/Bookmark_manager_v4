import React from "react";
import Members from "./index";
import "@/app/globals.css";
describe("<Members />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.viewport("macbook-15");
    cy.mount(<Members />);
  });
});
