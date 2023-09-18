import React from "react";
import Sidebar from "./index";
import "@/app/globals.css";
import ViewTabs from "../View";
import { fakeView } from "@/functions/fakedata";
import Navbar from "../Navbar";
describe("<Sidebar />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.viewport("macbook-13");
    cy.mount(
      <Sidebar>
        <div className="flex flex-col items-end">
          <div className="right-0">
            <Navbar />
          </div>
          <div className="">
            <ViewTabs views={fakeView(4)} />
          </div>
        </div>
      </Sidebar>,
    );
  });
});
