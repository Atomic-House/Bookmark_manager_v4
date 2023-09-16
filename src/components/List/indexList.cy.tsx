import React from "react";
import List from "./index";
import "@/app/globals.css";
import { fakeBookmarks } from "@/functions/fakedata";
const bookmarks = fakeBookmarks(10);

const bookmarks2 = fakeBookmarks(10);
describe("<List />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.viewport("macbook-16");
    cy.mount(
      <ul className="flex">
        <li>
          <List bookmarks={bookmarks} name={"Social Media"} id="lasjfdlaskjf" />
        </li>
        <li className="">
          <List bookmarks={bookmarks2} name={"Work"} id="lasjfdlasafjkjf" />
        </li>
      </ul>,
    );
  });
});
