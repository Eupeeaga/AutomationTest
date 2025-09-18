class CheckoutPage {
  constructor() {
    // Seletores da página de checkout
    this.elements = {
      // Shipping Information
      emailInput: '#customer-email',
      firstNameInput: 'input[name="firstname"]',
      lastNameInput: 'input[name="lastname"]',
      companyInput: 'input[name="company"]',
      streetAddressInput: 'input[name="street[0]"]',
      cityInput: 'input[name="city"]',
      regionSelect: 'select[name="region_id"]',
      postcodeInput: 'input[name="postcode"]',
      countrySelect: 'select[name="country_id"]',
      telephoneInput: 'input[name="telephone"]',
      
      // Shipping Methods
      shippingMethods: '.radio input[type="radio"]',
      shippingMethodLabels: '.radio label',
      
      // Payment Methods
      paymentMethods: '.payment-method input[type="radio"]',
      paymentMethodLabels: '.payment-method label',
      
      // Buttons
      nextButton: '.button.action.continue.primary',
      placeOrderButton: '.action.primary.checkout',
      
      // Order Summary
      orderSummary: '.opc-block-summary',
      orderTotal: '.grand.totals .amount .price',
      
      // Success Page
      successMessage: '.checkout-success .base',
      orderNumber: '.checkout-success .order-number',
      
      // Error Messages
      errorMessages: '.message-error'
    }
  }

  visit() {
    cy.visit('/checkout/')
    cy.waitForPageLoad()
    return this
  }

  fillShippingInfo(shippingInfo) {
    const {
      email,
      firstName,
      lastName,
      company = '',
      streetAddress,
      city,
      region,
      postcode,
      country,
      telephone
    } = shippingInfo

    if (email) {
      cy.get(this.elements.emailInput).clear().type(email)
    }
    
    cy.get(this.elements.firstNameInput).clear().type(firstName)
    cy.get(this.elements.lastNameInput).clear().type(lastName)
    
    if (company) {
      cy.get(this.elements.companyInput).clear().type(company)
    }
    
    cy.get(this.elements.streetAddressInput).clear().type(streetAddress)
    cy.get(this.elements.cityInput).clear().type(city)
    
    if (country) {
      cy.get(this.elements.countrySelect).select(country)
    }
    
    if (region) {
      cy.get(this.elements.regionSelect).select(region)
    }
    
    cy.get(this.elements.postcodeInput).clear().type(postcode)
    cy.get(this.elements.telephoneInput).clear().type(telephone)
    
    return this
  }

  selectShippingMethod(methodIndex = 0) {
    cy.get(this.elements.shippingMethods).eq(methodIndex).check({ force: true })
    return this
  }

  proceedToPayment() {
    cy.get(this.elements.nextButton).click()
    cy.waitForPageLoad()
    return this
  }

  selectPaymentMethod(methodIndex = 0) {
    cy.get(this.elements.paymentMethods).eq(methodIndex).check({ force: true })
    return this
  }

  placeOrder() {
    cy.get(this.elements.placeOrderButton).click()
    return this
  }

  completeCheckout(shippingInfo, shippingMethodIndex = 0, paymentMethodIndex = 0) {
    this.fillShippingInfo(shippingInfo)
    this.selectShippingMethod(shippingMethodIndex)
    this.proceedToPayment()
    this.selectPaymentMethod(paymentMethodIndex)
    this.placeOrder()
    return this
  }

  verifyOrderSuccess() {
    cy.get(this.elements.successMessage).should('contain.text', 'Thank you for your purchase!')
    return this
  }

  verifyOrderPlaced() {
    cy.url().should('include', '/checkout/onepage/success/')
    this.verifyOrderSuccess()
    return this
  }

  getOrderNumber() {
    return cy.get(this.elements.orderNumber).invoke('text')
  }

  verifyOrderTotal(expectedTotal) {
    cy.get(this.elements.orderTotal).should('contain.text', expectedTotal)
    return this
  }

  verifyErrorMessage(message) {
    cy.get(this.elements.errorMessages).should('contain.text', message)
    return this
  }
}

export default CheckoutPage
