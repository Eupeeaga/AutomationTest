class ProductDetailsPage {
  constructor() {
    // Seletores atualizados da página de detalhes do produto
    this.elements = {
      productName: '.page-title span.base',
      productPrice: 'span[data-price-type="finalPrice"] span.price',
      productSku: '[itemprop="sku"]',
      productDescription: '[itemprop="description"]',
      addToCartButton: '#product-addtocart-button',
      quantityInput: 'input#qty',
      sizeOptions: '#product-options-wrapper .swatch-attribute.size .swatch-option',
      colorOptions: '#product-options-wrapper .swatch-attribute.color .swatch-option',
      productImages: '.fotorama__stage__shaft img',
      addToWishlistButton: '.towishlist',
      addToCompareButton: '.tocompare',
      successMessage: '[data-ui-id="message-success"]',
      errorMessage: '[data-ui-id="message-error"]',
      stockStatus: '.stock.available',
      configurationOptions: '#product-options-wrapper .swatch-attribute',
      colorSwatches: '.swatch-attribute[attribute-code="color"] .swatch-option',
      sizeSwatches: '.swatch-attribute[attribute-code="size"] .swatch-option'
    }
  }

  visit(productUrl) {
    cy.visit(productUrl)
    return this
  }

  selectSize(size) {
    cy.get('.swatch-attribute-options .swatch-option')
      .contains(size)
      .click()
    return this
  }

  selectColor(color) {
    cy.get('.swatch-attribute[attribute-code="color"] .swatch-option')
      .first()
      .click()
    return this
  }

  setQuantity(quantity) {
    cy.get(this.elements.quantityInput)
      .clear()
      .type(quantity.toString())
    return this
  }

  addToCart() {
    cy.get(this.elements.addToCartButton)
      .should('not.be.disabled')
      .click()
    return this
  }

  addToCartWithOptions(quantity = 1, size = null, color = null) {
    cy.get(this.elements.configurationOptions).should('be.visible')
    
    if (size) this.selectSize(size)
    if (color) this.selectColor(color)
    if (quantity !== 1) this.setQuantity(quantity)
    
    return this.addToCart()
  }

  addToWishlist() {
    cy.get(this.elements.addToWishlistButton).click()
    return this
  }

  addToCompare() {
    cy.get(this.elements.addToCompareButton).click()
    return this
  }

  verifyProductLoaded() {
    cy.get(this.elements.productName).should('be.visible')
    cy.get(this.elements.productPrice).should('be.visible')
    return this
  }

  verifyAddToCartSuccess() {
    cy.get(this.elements.successMessage).should('contain.text', 'You added')
    return this
  }

  verifyProductInStock() {
    cy.get(this.elements.stockStatus).should('contain.text', 'In stock')
    return this
  }

  getProductName() {
    return cy.get(this.elements.productName).invoke('text')
  }

  getProductPrice() {
    return cy.get(this.elements.productPrice).invoke('text')
  }
}

export default ProductDetailsPage
