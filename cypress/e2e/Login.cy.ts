describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/user/auth/signin");
    cy.getGoogleApiLogin();
    cy.visit("http://localhost:3000/main/home");
  });
});
