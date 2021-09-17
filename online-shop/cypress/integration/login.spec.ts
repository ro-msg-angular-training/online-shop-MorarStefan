/// <reference types="cypress" />

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('include', '/login');
  });

  it('should login user successfully pressing button', () => {
    cy.get('#mat-input-0').type('doej');
    cy.get('#mat-input-1').type('1234');
    cy.get('.mat-focus-indicator').click();

    cy.url().should('include', '/products');
  });

  it('should fail login', () => {
    cy.get('#mat-input-0').type('invalid');
    cy.get('#mat-input-1').type('invalid');
    cy.get('.mat-focus-indicator').click();

    cy.get('.mat-snack-bar-container').should('be.visible');
    cy.url().should('include', '/login');
  });

  it('should login user successfully pressing Enter', () => {
    cy.get('#mat-input-0').type('doej');
    cy.get('#mat-input-1').type('1234{enter}');

    cy.url().should('include', '/products');
  });
});
