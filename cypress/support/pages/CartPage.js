class CartPage {
  constructor() {
    // Seletores da página do carrinho
    this.elements = {
      cartItems: '.cart.item',
      productNames: '.product-item-name a',
      productPrices: '.cart-price .price',
      productQuantities: '.input-text.qty',
      updateButtons: '.action.update',
      removeButtons: '.action.action-delete',
      subtotal: '.cart-summary .sub .amount .price',
      grandTotal: '.cart-summary .grand .amount .price',
      proceedToCheckoutButton: '.action.primary.checkout',
      continueShoppingButton: '.action.continue',
      clearCartButton: '.action.clear',
      cartTitle: '.page-title .base',
      emptyCartMessage: '.cart-empty',
      couponCode: '#coupon_code',
      applyCouponButton: '.action.apply.primary',
      estimateShipping: '.estimate.shipping'
    }
  }

  visit() {
    cy.visit('/checkout/cart/')
    cy.waitForPageLoad()
    return this
  }

  updateQuantity(productName, quantity) {
    this.getCartItemByProduct(productName)
      .find(this.elements.productQuantities)
      .clear()
      .type(quantity.toString())
    this.getCartItemByProduct(productName)
      .find(this.elements.updateButtons)
      .click()
    return this
  }

  removeProduct(productName) {
    this.getCartItemByProduct(productName)
      .find(this.elements.removeButtons)
      .click()
    return this
  }

  getCartItemByProduct(productName) {
    return cy.get(this.elements.cartItems)
      .contains(this.elements.productNames, productName)
      .closest(this.elements.cartItems)
  }

  proceedToCheckout() {
    cy.get(this.elements.proceedToCheckoutButton).click()
    return this
  }

  continueShopping() {
    cy.get(this.elements.continueShoppingButton).click()
    return this
  }

  clearCart() {
    cy.get(this.elements.clearCartButton).click()
    return this
  }

  applyCoupon(couponCode) {
    cy.get(this.elements.couponCode).type(couponCode)
    cy.get(this.elements.applyCouponButton).click()
    return this
  }

  verifyCartNotEmpty() {
    cy.get(this.elements.cartItems).should('have.length.greaterThan', 0)
    return this
  }

  verifyCartEmpty() {
    cy.get(this.elements.emptyCartMessage).should('be.visible')
    return this
  }

  verifyProductInCart(productName) {
    cy.get(this.elements.productNames).should('contain.text', productName)
    return this
  }

  verifyProductNotInCart(productName) {
    cy.get(this.elements.productNames).should('not.contain.text', productName)
    return this
  }

  getSubtotal() {
    return cy.get(this.elements.subtotal).invoke('text')
  }

  getGrandTotal() {
    return cy.get(this.elements.grandTotal).invoke('text')
  }

  getProductQuantity(productName) {
    return this.getCartItemByProduct(productName)
      .find(this.elements.productQuantities)
      .invoke('val')
  }
}

export default CartPage
