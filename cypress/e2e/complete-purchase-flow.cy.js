describe('Fluxo completo de compra', () => {
  let testData

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data
    })

    cy.intercept('POST', '**/customer/account/loginPost/**', (req) => {
      cy.log('Interceptando requisição de login')
      cy.log(`Corpo original: ${req.body}`)

      // Modificar o corpo da requisição para incluir o CAPTCHA
      if (typeof req.body === 'string') {
        const searchParams = new URLSearchParams(req.body)
        
        // Adiciona ou atualiza os parâmetros do CAPTCHA
        searchParams.set('captcha_form_id', 'user_login')
        searchParams.set('captcha_string', 'bypass')
        
        searchParams.set('timestamp', Date.now().toString())
        
        req.body = searchParams.toString()
        
        cy.log(`Corpo modificado: ${req.body}`)
      } else {
        cy.log('Aviso: Corpo da requisição não está no formato esperado')
      }
    }).as('loginRequest')

    // Opcional: Interceptar a resposta para verificar o sucesso
    cy.intercept('GET', '**/customer/account/**').as('loginSuccess')
  })

  it('Deve completar todo o fluxo de compra com sucesso', () => {
    const timestamp = Date.now()
    const user = {
      firstName: 'Test',
      lastName: 'User',
      email: `test.user.${timestamp}@example.com`,
      password: 'Test123@#$'
    }

    // 1. Cadastro de Usuário
    cy.visit('/customer/account/create')
    cy.get('#firstname').type(user.firstName)
    cy.get('#lastname').type(user.lastName)
    cy.get('#email_address').type(user.email)
    cy.get('#password').type(user.password)
    cy.get('#password-confirmation').type(user.password)
    cy.get('.action.submit.primary').click()

    // Verificar sucesso do cadastro
    cy.url().should('include', '/customer/account')
    cy.get('.authorization-link').should('not.contain', 'Sign In')

    // 2. Login (já estará logado após o cadastro)
    cy.url().should('include', '/customer/account')

    // 3. Adicionar Produto ao Carrinho
    // Ir direto para um produto específico para evitar problemas de navegação
    cy.visit('/radiant-tee.html')
    cy.wait(2000)

    cy.log('Página do produto carregada')

    cy.get('.swatch-attribute-options').should('exist').then($el => {
      cy.log(`Encontrados ${$el.find('.swatch-option').length} opções de produto`)
    })

    // Selecionar opções do produto com verificações
    cy.get('.swatch-attribute-options .swatch-option')
      .first()
      .should('be.visible')
      .then($el => {
        cy.log(`Clicando no tamanho: ${$el.text()}`)
        cy.wrap($el).click()
      })

    cy.wait(1000)

    cy.get('#option-label-color-93-item-50')
      .should('be.visible')
      .then($el => {
        cy.log(`Clicando na cor com ID específico: ${$el.attr('option-label')}`)
        cy.wrap($el).click()
      })

    cy.get('#qty')
      .should('be.visible')
      .clear()
      .type('1')
    
    // Adicionar ao carrinho
    cy.get('#product-addtocart-button').click()
    
    cy.get('.message-success').should('exist')
    cy.wait(2000)

    // 4. Ir para o carrinho
    cy.get('.showcart').should('be.visible').click()
    cy.wait(2000)
    
    cy.get('.block-minicart').should('be.visible')
    
    cy.get('#top-cart-btn-checkout')
      .should('be.visible')
      .click()

    // Preencher informações de envio
    cy.get('[name="street[0]"]').type('123 Test Street')
    cy.get('[name="city"]').type('Test City')
    cy.get('[name="region_id"]').select('1')
    cy.get('[name="postcode"]').type('12345')
    cy.get('[name="telephone"]').type('1234567890')

    cy.get('[type="radio"]').first().check()
    cy.get('.button.action.continue.primary').click()

    cy.get('.action.primary.checkout').click()

    // Verificar sucesso da compra
    cy.url().should('include', '/checkout/onepage/success/')
    cy.get('body').then(($body) => {
      if ($body.find('.checkout-success').length) {
        cy.get('.checkout-success').should('be.visible')
      } else {
        // Alternativa: verificar apenas se não está mais na página de checkout
        cy.url().should('not.include', '/checkout/payment')
      }
    })
  })
})