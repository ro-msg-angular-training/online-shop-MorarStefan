/// <reference types="cypress" />

describe('Products Page', () => {
  beforeEach(() => {
    cy.fixture('products').then((products) => {
      cy.intercept(
        {
          method: 'GET',
          url: '**/products',
        },
        {
          body: products,
          delayMs: 500,
        }
      ).as('getProducts');
    });
    cy.visit('/');
  });

  it('should list products for customer', () => {
    cy.get('#mat-input-0').type('doej');
    cy.get('#mat-input-1').type('1234');
    cy.get('.mat-focus-indicator').click();

    cy.wait('@getProducts').should(({ response }) => {
      expect(response?.statusCode).eq(200);
      expect(response?.body).to.have.length(2);
    });

    cy.get('.add-product-button').should('not.exist');
  });

  it('should list products for admin', () => {
    cy.get('#mat-input-0').type('blackj');
    cy.get('#mat-input-1').type('1234');
    cy.get('.mat-focus-indicator').click();

    cy.wait('@getProducts');
    cy.get('.add-product-button').should('be.visible');
  });

  it('should add new product', () => {
    cy.get('#mat-input-0').type('blackj');
    cy.get('#mat-input-1').type('1234');
    cy.get('.mat-focus-indicator').click();

    cy.wait('@getProducts');

    cy.intercept('POST', '**/products').as('createProduct');

    cy.get('.add-product-button').click();

    const uuid = () => Cypress._.random(0, 1e6);
    const id = uuid();
    const name = `Phone-${id}`;
    cy.get('#mat-input-2').type(name);

    cy.get(
      '#mat-select-0 > .mat-select-trigger > .mat-select-arrow-wrapper'
    ).click();
    cy.get('#mat-option-0 > .mat-option-text').click();
    cy.get(
      '#mat-select-2 > .mat-select-trigger > .mat-select-arrow-wrapper'
    ).click();
    cy.get('#mat-option-6 > .mat-option-text').click();
    cy.get('#mat-input-3').type('Internal memory: 128 GB');
    cy.get('#mat-input-4').type('1000');
    cy.get('#mat-input-5').type('0.2');
    cy.get('#mat-input-6').type('tmp\\iphone.jpg');
    cy.get('.mat-dialog-actions > .mat-primary').click();

    // cy.wait('@createProduct').should(({ response }) => {
    //   expect(response?.statusCode).eq(201);
    // });

    // cy.get(':nth-child(4) > .cdk-column-product').should('be.visible');
  });

  it('should navigate to product details', () => {
    cy.get('#mat-input-0').type('blackj');
    cy.get('#mat-input-1').type('1234');
    cy.get('.mat-focus-indicator').click();

    cy.wait('@getProducts');

    cy.get(
      ':nth-child(2) > .cdk-column-action > a > .mat-focus-indicator > .mat-button-wrapper > .mat-icon'
    ).click();
  });
});
