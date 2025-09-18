class CreateAccountPage {
  constructor() {
    // Seletores da página de cadastro
    this.elements = {
      firstNameInput: '#firstname',
      lastNameInput: '#lastname',
      emailInput: '#email_address',
      passwordInput: '#password',
      confirmPasswordInput: '#password-confirmation',
      createAccountButton: '.action.submit.primary',
      pageTitle: '.page-title',
      errorMessages: '.message-error',
      successMessage: '.message-success'
    }
  }

  visit() {
    cy.visit('/customer/account/create/')
    cy.waitForPageLoad()
    return this
  }

  fillPersonalInfo(firstName, lastName, email) {
    cy.get(this.elements.firstNameInput).clear().type(firstName)
    cy.get(this.elements.lastNameInput).clear().type(lastName)
    cy.get(this.elements.emailInput).clear().type(email)
    return this
  }

  fillPassword(password, confirmPassword = null) {
    cy.get(this.elements.passwordInput).clear().type(password)
    cy.get(this.elements.confirmPasswordInput).clear().type(confirmPassword || password)
    return this
  }

  submitForm() {
    cy.get(this.elements.createAccountButton).click()
    return this
  }

  createAccount(firstName, lastName, email, password) {
    this.fillPersonalInfo(firstName, lastName, email)
    this.fillPassword(password)
    this.submitForm()
    return this
  }

  verifyPageLoaded() {
    cy.get(this.elements.pageTitle).should('contain.text', 'Create New Customer Account')
    return this
  }

  verifyAccountCreated() {
    cy.url().should('include', '/customer/account/')
    cy.get(this.elements.successMessage).should('contain.text', 'Thank you for registering')
    return this
  }

  verifyErrorMessage(message) {
    cy.get(this.elements.errorMessages).should('contain.text', message)
    return this
  }
}

export default CreateAccountPage
