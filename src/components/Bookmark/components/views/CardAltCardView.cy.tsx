import React from "react";
import { AltCardView } from "./Card";
import "@/app/globals.css";
describe("<AltCardView />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AltCardView />);
  });
});
