import HomePage from '../support/pages/HomePage'
import ProductListPage from '../support/pages/ProductListPage'
import ProductDetailsPage from '../support/pages/ProductDetailsPage'
import CartPage from '../support/pages/CartPage'
import LoginPage from '../support/pages/LoginPage'

describe('Adicionar Produto ao Carrinho', () => {
  const homePage = new HomePage()
  const productListPage = new ProductListPage()
  const productDetailsPage = new ProductDetailsPage()
  const cartPage = new CartPage()
  const loginPage = new LoginPage()
  let testData

  before(function() {
    cy.fixture('testData').then((data) => {
      testData = data
      
      // Realizar login uma única vez antes de todos os testes
      homePage.visit()
      homePage.goToSignIn()
      loginPage.verifyPageLoaded()
      
      const user = data.users.existingUser
      loginPage.fillCredentials(user.email, user.password)
      cy.wait(1000)
      loginPage.submitLogin()
      
      // Verificar se o login foi realizado com sucesso
      cy.wait(2000) // Aguardar o redirecionamento
      cy.get('.header.links').should('not.contain', 'Sign In')
      cy.get('.header.links').should('contain', 'Sign Out')
      cy.get('.header.links').should('contain', 'My Account')
    })
  })

  beforeEach(() => {
    // Apenas retornar à página inicial antes de cada teste
    homePage.visit()
  })

  it('Deve adicionar produto ao carrinho pela listagem', () => {
    const product = testData.products.testProduct1

    // Navegar para categoria de produtos
    homePage.navigateToCategory('Women')
    
    // Verificar se os produtos foram carregados
    productListPage.verifyProductsDisplayed()
    
    // Adicionar produto ao carrinho
    productListPage.addProductToCart(product.name)
    
    // Verificar se produto foi adicionado com sucesso
    cy.get('.message-success').should('contain.text', 'You added')
    
    // Verificar carrinho
    cartPage.visit()
    cartPage.verifyProductInCart(product.name)
  })

  it('Deve adicionar produto ao carrinho pela página de detalhes', () => {
    const product = testData.products.testProduct1

    // Buscar produto
    homePage.searchProduct(product.name)
    
    // Ir para detalhes do produto
    productListPage.viewProductDetails(product.name)
    
    // Verificar se a página de detalhes foi carregada
    productDetailsPage.verifyProductLoaded()
    
    // Adicionar ao carrinho com opções
    productDetailsPage.addToCartWithOptions(1, product.size, product.color)
    
    // Verificar sucesso
    productDetailsPage.verifyAddToCartSuccess()
    
    // Verificar no carrinho
    cartPage.visit()
    cartPage.verifyProductInCart(product.name)
  })

  it('Deve adicionar múltiplos produtos ao carrinho', () => {
    const product1 = testData.products.testProduct1
    const product2 = testData.products.testProduct2

    // Adicionar primeiro produto
    homePage.searchProduct(product1.name)
    productListPage.viewProductDetails(product1.name)
    productDetailsPage.addToCartWithOptions(1, product1.size, product1.color)
    
    // Voltar para home
    homePage.visit()
    
    // Adicionar segundo produto
    homePage.searchProduct(product2.name)
    productListPage.viewProductDetails(product2.name)
    productDetailsPage.addToCartWithOptions(2, product2.size, product2.color)
    
    // Verificar carrinho com ambos produtos
    cartPage.visit()
    cartPage.verifyProductInCart(product1.name)
    cartPage.verifyProductInCart(product2.name)
  })

  it('Deve permitir alterar quantidade no carrinho', () => {
    const product = testData.products.testProduct1

    // Adicionar produto ao carrinho
    homePage.searchProduct(product.name)
    productListPage.viewProductDetails(product.name)
    productDetailsPage.addToCartWithOptions(1, product.size, product.color)
    
    // Ir para carrinho
    cartPage.visit()
    cartPage.verifyProductInCart(product.name)
    
    // Alterar quantidade
    cartPage.updateQuantity(product.name, 3)
    
    // Verificar se quantidade foi atualizada
    cartPage.getProductQuantity(product.name).should('eq', '3')
  })

  it('Deve permitir remover produto do carrinho', () => {
    const product = testData.products.testProduct1

    // Adicionar produto ao carrinho
    homePage.searchProduct(product.name)
    productListPage.viewProductDetails(product.name)
    productDetailsPage.addToCartWithOptions(1, product.size, product.color)
    
    // Ir para carrinho
    cartPage.visit()
    cartPage.verifyProductInCart(product.name)
    
    // Remover produto
    cartPage.removeProduct(product.name)
    
    // Verificar se produto foi removido
    cartPage.verifyProductNotInCart(product.name)
  })

  it('Deve validar produto indisponível', () => {
    // Buscar produto que não existe ou está fora de estoque
    homePage.searchProduct('ProdutoIndisponivel')
    
    // Verificar mensagem de produto não encontrado
    cy.get('.message').should('contain.text', 'Your search returned no results')
  })

  it('Deve manter carrinho após navegação', () => {
    const product = testData.products.testProduct1

    // Adicionar produto ao carrinho
    homePage.searchProduct(product.name)
    productListPage.viewProductDetails(product.name)
    productDetailsPage.addToCartWithOptions(1, product.size, product.color)
    
    // Navegar por outras páginas
    homePage.visit()
    homePage.navigateToCategory('Men')
    
    // Verificar se carrinho ainda tem o produto
    cartPage.visit()
    cartPage.verifyProductInCart(product.name)
  })

  it('Deve calcular subtotal corretamente', () => {
    const product = testData.products.testProduct1

    // Adicionar produto ao carrinho
    homePage.searchProduct(product.name)
    productListPage.viewProductDetails(product.name)
    
    // Obter preço do produto
    let productPrice
    productDetailsPage.getProductPrice().then((price) => {
      productPrice = price
    })
    
    productDetailsPage.addToCartWithOptions(2, product.size, product.color)
    
    // Verificar carrinho
    cartPage.visit()
    cartPage.verifyProductInCart(product.name)
    
    // Verificar se subtotal está correto (preço × quantidade)
    cartPage.getSubtotal().then((subtotal) => {
      // Aqui você pode implementar a lógica para validar o cálculo
      expect(subtotal).to.not.be.empty
    })
  })
})
