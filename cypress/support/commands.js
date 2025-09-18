// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom commands for the Magento automation test

Cypress.Commands.add('login', (email, password) => {
  cy.get('[data-cy="customer-email"]').type(email)
  cy.get('[data-cy="customer-password"]').type(password)
  cy.get('[data-cy="customer-login-submit"]').click()
})

Cypress.Commands.add('addToCart', (productName) => {
  cy.contains(productName).click()
  cy.get('[data-cy="add-to-cart"]').click()
})

Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible')
  cy.get('.loading-mask').should('not.exist')
})

Cypress.Commands.add('clearCartIfNotEmpty', () => {
  cy.get('.minicart-wrapper').then(($minicart) => {
    if ($minicart.find('.counter-number').length > 0) {
      cy.get('.minicart-wrapper').click()
      cy.get('.action.delete').click()
      cy.get('.action-accept').click()
    }
  })
})

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
