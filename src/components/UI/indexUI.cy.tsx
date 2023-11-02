import React from "react";
import UI from "./index";
import "@/app/globals.css";
import { mount } from "cypress/react";
describe("<UI />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    mount(<UI />);
  });
});
