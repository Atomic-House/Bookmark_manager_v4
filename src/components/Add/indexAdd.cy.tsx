import React from "react";
import Add from "./index";
import "@/app/globals.css";
describe("<Add />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Add
        addText="Single"
        inputPlaceholder="Add email here"
        heading="Add single member"
        content="Send request to anyone using email"
        confirmBtnText="Send Request"
        cancelBtnText="Reset"
      />,
    );
  });
});
