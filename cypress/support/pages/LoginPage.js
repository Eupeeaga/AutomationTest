class LoginPage {
  constructor() {
    // Seletores da página de login
    this.elements = {
      emailInput: '#email',
      passwordInput: '#pass',
      signInButton: '#send2',
      pageTitle: '.page-title',
      errorMessages: '.message-error',
      forgotPasswordLink: '.action.remind',
      createAccountLink: '.action.create.primary'
    }
  }

  visit() {
    cy.visit('/customer/account/login/')
    cy.waitForPageLoad()
    return this
  }

  fillCredentials(email, password) {
    cy.get(this.elements.emailInput).clear().type(email)
    cy.get(this.elements.passwordInput).clear().type(password)
    return this
  }

  submitLogin() {
    cy.get(this.elements.signInButton).click()
    return this
  }

  login(email, password) {
    this.fillCredentials(email, password)
    this.submitLogin()
    return this
  }

  verifyPageLoaded() {
    cy.get(this.elements.pageTitle).should('contain.text', 'Customer Login')
    return this
  }

  verifyLoginSuccess() {
    cy.wait(2000)
    cy.get('.page.messages').should('not.contain', 'The account sign-in was incorrect')
    cy.get('.page-title-wrapper').should('contain', 'My Account')
    cy.get('.box-information').should('exist')
    return this
  }

  verifyLoginError(message) {
    cy.get(this.elements.errorMessages).should('contain.text', message)
    return this
  }

  goToCreateAccount() {
    cy.get(this.elements.createAccountLink).click()
    return this
  }
}

export default LoginPage
