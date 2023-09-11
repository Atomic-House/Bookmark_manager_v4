import React from "react";
import Add from "./index";
import "@/app/globals.css";
import ThemeProvider from "../Theme/themeProvider";
describe("<Add />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.viewport("macbook-13")
    cy.mount(
    <>
    <ThemeProvider/>
      <Add
        addText="Single"
        inputPlaceholder="Add email here"
        heading="Add single member"
        content="Send request to anyone using email"
        confirmBtnText="Send Request"
        cancelBtnText="Reset"
      />
</>
      ,
    );
  });
});
