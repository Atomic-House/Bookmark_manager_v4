import React from "react";
import CardView from "./Card";
import Providers from "@/app/providers";
const url = new URL("https://miro.com/app/board/uXjVM99FT9Q=/");

describe("<CardView />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Providers>
        <CardView
          
          id={"jfs"}
          name="test"
          url="https://miro.com/app/board/uXjVM99FT9Q=/"
          icon={`https://www.google.com/s2/favicons?domain=${url.hostname}&sz=256`}
          favicon={`https://www.google.com/s2/favicons?domain=${url.hostname}&sz=256`}
          preview={`https://www.google.com/s2/favicons?domain=${url.hostname}&sz=256`}
          tags={["hello", "world"]}
          mutateAsync={() => { }}
          title={"Miro"}
          createdAt={new Date()}
          email={"mirsahebali"}
          index={1}
          description={"Miro hello"}
          isDeleted={false}
          listId="'asdjflk"
        />
      </Providers>,
    );
  });
});
