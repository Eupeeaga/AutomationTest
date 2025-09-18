import HomePage from '../support/pages/HomePage'
import CreateAccountPage from '../support/pages/CreateAccountPage'

describe('Cadastro de Usuário', () => {
  const homePage = new HomePage()
  const createAccountPage = new CreateAccountPage()
  let testData

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data
    })
  })

  beforeEach(() => {
    homePage.visit()
  })

  it('Deve realizar cadastro de usuário com sucesso', () => {
    const user = testData.users.validUser
    const timestamp = Date.now()
    const uniqueEmail = `test.user.${timestamp}@example.com`

    // Navegar para página de cadastro
    homePage.goToCreateAccount()
    
    // Verificar se a página de cadastro foi carregada
    createAccountPage.verifyPageLoaded()
    
    // Preencher formulário de cadastro
    createAccountPage.createAccount(
      user.firstName,
      user.lastName,
      uniqueEmail,
      user.password
    )
    
    // Verificar se o cadastro foi realizado com sucesso
    createAccountPage.verifyAccountCreated()
    
    // Verificar se o usuário está logado
    cy.url().should('include', '/customer/account/')
    cy.contains('Welcome').should('be.visible')
  })

  it('Deve exibir erro ao tentar cadastrar com email já existente', () => {
    const user = testData.users.validUser

    // Navegar para página de cadastro
    homePage.goToCreateAccount()
    createAccountPage.verifyPageLoaded()
    
    // Tentar cadastrar com email que já existe
    createAccountPage.createAccount(
      user.firstName,
      user.lastName,
      'existing@example.com', // Email que já existe no sistema
      user.password
    )
    
    // Verificar mensagem de erro
    createAccountPage.verifyErrorMessage('There is already an account with this email address')
  })


  it('Deve validar formato de email inválido', () => {
    const user = testData.users.validUser

    // Navegar para página de cadastro
    homePage.goToCreateAccount()
    createAccountPage.verifyPageLoaded()
    
    // Preencher com email inválido
    createAccountPage.fillPersonalInfo(
      user.firstName,
      user.lastName,
      'email-invalido'
    )
    createAccountPage.fillPassword(user.password)
    createAccountPage.submitForm()
    
    // Verificar mensagem de erro para email inválido
    cy.get('#email_address-error').should('contain.text', 'Please enter a valid email address')
  })

  it('Deve validar confirmação de senha', () => {
    const user = testData.users.validUser
    const timestamp = Date.now()
    const uniqueEmail = `test.user.${timestamp}@example.com`

    // Navegar para página de cadastro
    homePage.goToCreateAccount()
    createAccountPage.verifyPageLoaded()
    
    // Preencher dados pessoais
    createAccountPage.fillPersonalInfo(
      user.firstName,
      user.lastName,
      uniqueEmail
    )
    
    // Preencher senhas diferentes
    createAccountPage.fillPassword(user.password, 'SenhasDiferentes123')
    createAccountPage.submitForm()
    
    // Verificar mensagem de erro
    cy.get('#password-confirmation-error').should('contain.text', 'Please enter the same value again')
  })
})
