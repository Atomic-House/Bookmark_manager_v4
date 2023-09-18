import ThemeProvider from "../Theme/themeProvider";
import Layout from "./Layout";
import "@/app/globals.css";

describe("<View />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <div>
        <ThemeProvider />
        <Layout />
      </div>,
    );
  });
});
