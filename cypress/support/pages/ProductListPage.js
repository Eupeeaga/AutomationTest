class ProductListPage {
  constructor() {
    // Seletores da página de listagem de produtos
    this.elements = {
      productItems: '.product-item',
      productNames: '.product-item .product-item-link',
      productPrices: '.product-item .price',
      addToCartButtons: '.product-item .action.tocart.primary',
      addToWishlistButtons: '.product-item .action.towishlist',
      productImages: '.product-item .product-image-photo',
      sortDropdown: '#sorter',
      showPerPageDropdown: '#limiter',
      modeListButton: '.modes-mode.mode-list',
      modeGridButton: '.modes-mode.mode-grid',
      pageTitle: '.page-title',
      resultCount: '.toolbar-number'
    }
  }

  visit(category = '') {
    if (category) {
      cy.visit(`/${category}.html`)
    }
    cy.waitForPageLoad()
    return this
  }

  getProductByName(productName) {
    return cy.get(this.elements.productNames).contains(productName).parent()
  }

  addProductToCart(productName) {
    this.getProductByName(productName)
      .find(this.elements.addToCartButtons)
      .click()
    return this
  }

  viewProductDetails(productName) {
    this.getProductByName(productName).click()
    return this
  }

  sortProducts(sortOption) {
    cy.get(this.elements.sortDropdown).select(sortOption)
    return this
  }

  changeItemsPerPage(itemsPerPage) {
    cy.get(this.elements.showPerPageDropdown).select(itemsPerPage)
    return this
  }

  switchToListView() {
    cy.get(this.elements.modeListButton).click()
    return this
  }

  switchToGridView() {
    cy.get(this.elements.modeGridButton).click()
    return this
  }

  verifyProductsDisplayed() {
    cy.get(this.elements.productItems).should('have.length.greaterThan', 0)
    return this
  }

  verifyProductExists(productName) {
    cy.get(this.elements.productNames).should('contain.text', productName)
    return this
  }
}

export default ProductListPage
