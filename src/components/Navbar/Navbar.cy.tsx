import React from "react";
import Navbar from "./";
import "@/app/globals.css";
describe("<Navbar />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.viewport("macbook-16");
    cy.mount(<Navbar />);
  });
});
