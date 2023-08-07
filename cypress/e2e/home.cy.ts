describe("Home page", () => {
  it("logins and routes to home", () => {
    Cypress.on("uncaught:exception", () => {
      return false;
    });
    cy.visit("http://localhost:3000/user/auth/signin");
    cy.get(".text-black").click();
    cy.wait(3000);
    cy.get("input").type("mirsahebali.04@gmail.com");
    cy.wait(3000);
    // cy.get("input").type("{enter}");
  });
});
