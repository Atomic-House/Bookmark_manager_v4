import React from "react";
import Create from "./index";
import "@/app/globals.css";
import Providers from "@/app/providers";
describe("<Create />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Providers>
        <Create
          triggerPlaceholder="+"
          buttonStyle="text-white bg-slate-700  rounded-lg"
          submitBtnStyle="bg-[#422AFB]"
          bodyStyle="bg-slate-50  p-6 rounded-lg flex flex-col "
          header={<p> New List </p>}
          content={<p>Create a new list, name it and add you bookmark </p>}
          inputStyle="bg-slate-50 p-2 rounded-full placeholder:text-slate-400"
          placeholder="Type list name here..."
        />
      </Providers>,
    );
  });
});
