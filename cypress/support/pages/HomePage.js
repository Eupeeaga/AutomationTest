class HomePage {
  constructor() {
    // Seletores da página inicial (apenas seletores Magento)
    this.elements = {
      searchBox: 'input#search',
      searchButton: 'button[title="Search"]',
      createAccountLink: 'li.authorization-link a[href*="account/create"]',
      signInLink: 'li.authorization-link a[href*="customer/account/login"]',
      logoLink: 'a.logo',
      categoryMenu: '.nav-sections .navigation',
      menuItems: '.navigation .ui-menu > li > a.level-top',
      minicartIcon: 'a.action.showcart',
      cartCounter: '.counter.qty .counter-number',
      headerLinks: '.header.links li a'
    }
  }

  visit() {
    cy.visit('/')
    return this
  }

  searchProduct(productName) {
    cy.get(this.elements.searchBox).type(productName)
    cy.get(this.elements.searchButton).click()
    return this
  }

  goToCreateAccount() {
    cy.get(this.elements.headerLinks).contains('Create an Account').click()
    return this
  }

  goToSignIn() {
    cy.get(this.elements.headerLinks).contains('Sign In').click()
    return this
  }

  navigateToCategory(categoryName) {
    cy.get(this.elements.menuItems).contains(categoryName).click()
    return this
  }

  verifyPageLoaded() {
    cy.get(this.elements.logoLink).should('be.visible')
    return this
  }

  openMinicart() {
    cy.get(this.elements.minicartIcon).click()
    return this
  }

  getCartItemCount() {
    return cy.get(this.elements.cartCounter)
  }
}

export default HomePage
