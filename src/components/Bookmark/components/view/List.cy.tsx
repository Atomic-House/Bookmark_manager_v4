import React from "react";
import ListView from "./List";
import "@/app/globals.css";
describe("<List />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <span className="flex items-center w-[20-vw] border-white border-2 justify-center">
        <ListView
          url={`/laskjflks/l;aksdjdfa;s`}
          id="al;sjasldk"
          title="Google"
          favicon="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
          name={"as;kdfj"}
        />
      </span>,
    );
  });
});
