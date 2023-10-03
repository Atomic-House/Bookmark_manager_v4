import React from "react";
import Card from "./Card";
import "@/app/globals.css";
describe("<Card />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Card
        title="NetFlix"
        name="Netflix"
        description="Netflix"
        url={"https://www.netflix.com"}
        id="1"
        favicon={
          "https://yt3.googleusercontent.com/ytc/AOPolaSbaST1JBNd9phht_n7tFN-VHx0FlvKPHeSDnmu4Q=s900-c-k-c0x00ffffff-no-rj"
        }
        preview={
          "https://variety.com/wp-content/uploads/2020/05/netflix-logo.png"
        }
      />,
    );
  });
});
