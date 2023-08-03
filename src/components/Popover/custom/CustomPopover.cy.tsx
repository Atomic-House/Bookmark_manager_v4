import Popover from ".";
import "@/app/globals.css";
describe("My custom popover", () => {
  it("should render", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <main className="bg-green-500">
        <Popover
          bg="bg-white"
          rounded="rounded-lg"
          text="text-black"
          contentStyle="drop-shadow-lg"
        />
      </main>,
    );
    cy.contains(".grid").should("exist");
  });
});
