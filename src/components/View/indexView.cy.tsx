import View from "./index";
import "@/app/globals.css";
import { fakeView } from "@/functions/fakedata";
const views = fakeView(4);

describe("<View />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.viewport("macbook-16");
    cy.mount(<View views={views} />);
  });
});
