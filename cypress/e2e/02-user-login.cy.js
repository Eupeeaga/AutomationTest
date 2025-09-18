import HomePage from '../support/pages/HomePage'
import LoginPage from '../support/pages/LoginPage'

describe('Login de Usuário', () => {
  const homePage = new HomePage()
  const loginPage = new LoginPage()
  let testData

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data
    })
  })

  beforeEach(() => {
    homePage.visit()
  })

  it.only('Deve realizar login com credenciais válidas', () => {
    const user = testData.users.existingUser

    // Navegar para página de login
    homePage.goToSignIn()
    
    // Verificar se a página de login foi carregada
    loginPage.verifyPageLoaded()
    
    // Realizar login
    loginPage.login(user.email, user.password)
    
    // Verificar se o login foi realizado com sucesso
    cy.wait(2000) // Aguardar o redirecionamento
    cy.get('.logged-in').should('exist')
    cy.get('.header.panel > .header.links').should('contain', 'Welcome')
    cy.get('.page.messages').should('not.contain', 'The account sign-in was incorrect')
  })

  it('Deve exibir erro com credenciais inválidas', () => {
    // Navegar para página de login
    homePage.goToSignIn()
    loginPage.verifyPageLoaded()
    
    // Tentar login com credenciais inválidas
    loginPage.login('email-inexistente@example.com', 'senhaErrada123')
    
    // Verificar mensagem de erro
    loginPage.verifyLoginError('The account sign-in was incorrect')
  })



  it('Deve validar formato de email no login', () => {
    // Navegar para página de login
    homePage.goToSignIn()
    loginPage.verifyPageLoaded()
    
    // Tentar login com email inválido
    loginPage.fillCredentials('email-invalido', 'qualquersenha')
    loginPage.submitLogin()
    
    // Verificar mensagem de erro para email inválido
    cy.get('#email-error').should('contain.text', 'Please enter a valid email address')
  })

  it('Deve permitir navegação para criação de conta', () => {
    // Navegar para página de login
    homePage.goToSignIn()
    loginPage.verifyPageLoaded()
    
    // Clicar no link para criar conta
    loginPage.goToCreateAccount()
    
    // Verificar se foi direcionado para página de cadastro
    cy.url().should('include', '/customer/account/create')
    cy.get('.page-title').should('contain.text', 'Create New Customer Account')
  })

  it('Deve manter sessão após login bem-sucedido', () => {
    const user = testData.users.existingUser

    // Realizar login
    homePage.goToSignIn()
    loginPage.verifyPageLoaded()
    loginPage.login(user.email, user.password)
    loginPage.verifyLoginSuccess()
    
    // Navegar para home e verificar se ainda está logado
    homePage.visit()
    cy.get('.authorization-link').should('contain', 'Sign Out')
  })
})
