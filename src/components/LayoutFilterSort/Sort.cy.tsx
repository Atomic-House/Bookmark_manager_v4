import ThemeProvider from "../Theme/themeProvider";
import Sort from "./Sort";
import "@/app/globals.css";
describe("<Sort />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <div>
        <ThemeProvider />
        <Sort />
      </div>,
    );
  });
});

