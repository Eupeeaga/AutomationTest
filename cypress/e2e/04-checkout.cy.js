import HomePage from '../support/pages/HomePage'
import ProductListPage from '../support/pages/ProductListPage'
import ProductDetailsPage from '../support/pages/ProductDetailsPage'
import CartPage from '../support/pages/CartPage'
import CheckoutPage from '../support/pages/CheckoutPage'
import LoginPage from '../support/pages/LoginPage'

describe('Finalização de Compra (Checkout)', () => {
  const homePage = new HomePage()
  const productListPage = new ProductListPage()
  const productDetailsPage = new ProductDetailsPage()
  const cartPage = new CartPage()
  const checkoutPage = new CheckoutPage()
  const loginPage = new LoginPage()
  let testData

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data
    })
  })

  beforeEach(() => {
    homePage.visit()
    
    // Adicionar produto ao carrinho antes de cada teste
    const product = testData.products.testProduct1
    homePage.searchProduct(product.name)
    productListPage.viewProductDetails(product.name)
    productDetailsPage.addToCartWithOptions(1, product.size, product.color)
  })

  it('Deve finalizar compra como guest com sucesso', () => {
    const shipping = testData.shippingInfo.default
    const timestamp = Date.now()
    const guestEmail = `guest.${timestamp}@example.com`

    // Ir para carrinho e prosseguir para checkout
    cartPage.visit()
    cartPage.verifyCartNotEmpty()
    cartPage.proceedToCheckout()
    
    // Preencher informações de entrega
    const shippingInfo = {
      ...shipping,
      email: guestEmail
    }
    
    checkoutPage.completeCheckout(shippingInfo)
    
    // Verificar se o pedido foi finalizado com sucesso
    checkoutPage.verifyOrderPlaced()
    
    // Verificar se número do pedido foi gerado
    checkoutPage.getOrderNumber().should('not.be.empty')
  })

  it('Deve finalizar compra com usuário logado', () => {
    const user = testData.users.existingUser
    const shipping = testData.shippingInfo.default

    // Fazer login primeiro
    homePage.goToSignIn()
    loginPage.login(user.email, user.password)
    loginPage.verifyLoginSuccess()
    
    // Ir para carrinho e prosseguir para checkout
    cartPage.visit()
    cartPage.verifyCartNotEmpty()
    cartPage.proceedToCheckout()
    
    // Preencher apenas informações de entrega (email já preenchido)
    checkoutPage.completeCheckout(shipping)
    
    // Verificar se o pedido foi finalizado
    checkoutPage.verifyOrderPlaced()
  })

  it('Deve validar campos obrigatórios no checkout', () => {
    // Ir para checkout
    cartPage.visit()
    cartPage.proceedToCheckout()
    
    // Tentar prosseguir sem preencher informações
    checkoutPage.proceedToPayment()
    
    // Verificar mensagens de validação
    cy.get('.field-error').should('be.visible')
    cy.contains('This is a required field').should('be.visible')
  })

  it('Deve permitir selecionar diferentes métodos de entrega', () => {
    const shipping = testData.shippingInfo.default
    const timestamp = Date.now()
    const guestEmail = `guest.${timestamp}@example.com`

    // Ir para checkout
    cartPage.visit()
    cartPage.proceedToCheckout()
    
    // Preencher informações básicas
    const shippingInfo = {
      ...shipping,
      email: guestEmail
    }
    checkoutPage.fillShippingInfo(shippingInfo)
    
    // Verificar se métodos de entrega estão disponíveis
    cy.get(checkoutPage.elements.shippingMethods).should('have.length.greaterThan', 0)
    
    // Selecionar segundo método de entrega se disponível
    cy.get(checkoutPage.elements.shippingMethods).then(($methods) => {
      if ($methods.length > 1) {
        checkoutPage.selectShippingMethod(1)
      }
    })
  })

  it('Deve permitir selecionar diferentes métodos de pagamento', () => {
    const shipping = testData.shippingInfo.default
    const timestamp = Date.now()
    const guestEmail = `guest.${timestamp}@example.com`

    // Ir para checkout
    cartPage.visit()
    cartPage.proceedToCheckout()
    
    // Preencher informações e prosseguir para pagamento
    const shippingInfo = {
      ...shipping,
      email: guestEmail
    }
    checkoutPage.fillShippingInfo(shippingInfo)
    checkoutPage.selectShippingMethod()
    checkoutPage.proceedToPayment()
    
    // Verificar se métodos de pagamento estão disponíveis
    cy.get(checkoutPage.elements.paymentMethods).should('have.length.greaterThan', 0)
  })

  it('Deve exibir resumo do pedido corretamente', () => {
    const shipping = testData.shippingInfo.default
    const timestamp = Date.now()
    const guestEmail = `guest.${timestamp}@example.com`

    // Ir para checkout
    cartPage.visit()
    
    // Obter total do carrinho
    let cartTotal
    cartPage.getGrandTotal().then((total) => {
      cartTotal = total
    })
    
    cartPage.proceedToCheckout()
    
    // Verificar se resumo do pedido está visível
    cy.get(checkoutPage.elements.orderSummary).should('be.visible')
    
    // Verificar se total está correto
    cy.get(checkoutPage.elements.orderTotal).then((checkoutTotal) => {
      expect(checkoutTotal.text()).to.include(cartTotal)
    })
  })

  it('Deve permitir voltar para carrinho durante checkout', () => {
    // Ir para checkout
    cartPage.visit()
    cartPage.proceedToCheckout()
    
    // Voltar para carrinho
    cy.get('.action.back').click()
    
    // Verificar se voltou para carrinho
    cy.url().should('include', '/checkout/cart')
  })

  it('Deve validar formato de email no checkout', () => {
    const shipping = testData.shippingInfo.default

    // Ir para checkout
    cartPage.visit()
    cartPage.proceedToCheckout()
    
    // Preencher com email inválido
    const invalidShippingInfo = {
      ...shipping,
      email: 'email-invalido'
    }
    checkoutPage.fillShippingInfo(invalidShippingInfo)
    checkoutPage.proceedToPayment()
    
    // Verificar mensagem de erro
    cy.get('#customer-email-error').should('contain.text', 'Please enter a valid email address')
  })

  it('Deve manter informações preenchidas ao navegar entre etapas', () => {
    const shipping = testData.shippingInfo.default
    const timestamp = Date.now()
    const guestEmail = `guest.${timestamp}@example.com`

    // Ir para checkout
    cartPage.visit()
    cartPage.proceedToCheckout()
    
    // Preencher informações
    const shippingInfo = {
      ...shipping,
      email: guestEmail
    }
    checkoutPage.fillShippingInfo(shippingInfo)
    checkoutPage.selectShippingMethod()
    checkoutPage.proceedToPayment()
    
    // Voltar para etapa anterior
    cy.get('.step-title[data-role="title"]').first().click()
    
    // Verificar se informações foram mantidas
    cy.get(checkoutPage.elements.emailInput).should('have.value', guestEmail)
    cy.get(checkoutPage.elements.firstNameInput).should('have.value', shipping.firstName)
  })
})
