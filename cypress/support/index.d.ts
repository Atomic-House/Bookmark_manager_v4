/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to ... add your description here
     * @example cy.clickOnMyJourneyInCandidateCabinet()
     */
    // clickOnMyJourneyInCandidateCabinet(): Chainable<null>;
    getGoogleApiLogin(): Chainable<void>;
  }
}
