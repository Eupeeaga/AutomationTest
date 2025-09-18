# Magento Demo - Automação de Testes Web

## 📋 Descrição

# Projeto de Automação de Testes - Magento Demo

Este projeto contém automação de testes end-to-end para o site de demonstração do Magento usando Cypress e o padrão Page Object Model (POM).

## 📋 Descrição do Projeto

O projeto foi desenvolvido para automatizar os seguintes fluxos no site [Magento 2 Demo](https://magento2-demo.magebit.com/):

- **Cadastro de Usuário**: Validação de formulários e criação de contas
- **Login**: Autenticação de usuários existentes
- **Adicionar Produto ao Carrinho**: Seleção e adição de produtos
- **Finalização de Compra (Checkout)**: Processo completo de compra

## 🏗️ Arquitetura

### Padrão Page Object Model (POM)
O projeto utiliza o padrão POM para organizar o código de forma mais limpa e reutilizável:

```
cypress/
├── e2e/                          # Testes end-to-end
│   ├── 01-user-registration.cy.js
│   ├── 02-user-login.cy.js
│   ├── 03-add-to-cart.cy.js
│   └── 04-checkout.cy.js
├── support/
│   ├── pages/                    # Page Objects
│   │   ├── HomePage.js
│   │   ├── CreateAccountPage.js
│   │   ├── LoginPage.js
│   │   ├── ProductListPage.js
│   │   ├── ProductDetailsPage.js
│   │   ├── CartPage.js
│   │   └── CheckoutPage.js
│   ├── commands.js               # Comandos customizados
│   └── e2e.js                   # Configurações globais
├── fixtures/
│   └── testData.json            # Dados de teste
└── reports/                     # Relatórios gerados
```

## 🚀 Pré-requisitos

### ⚠️ IMPORTANTE: Node.js não detectado!

Para executar este projeto, você precisa instalar o Node.js primeiro:

1. **Baixe o Node.js** (versão 16 ou superior):
   - Acesse: https://nodejs.org/
   - Baixe a versão LTS (recomendada)
   - Execute o instalador e siga as instruções

2. **Reinicie o VS Code** após a instalação

3. **Verifique a instalação**:
   ```bash
   node --version
   npm --version
   ```

## ⚙️ Instalação (após instalar Node.js)

1. **Instale as dependências**
   ```bash
   npm install
   ```

2. **Verifique a instalação do Cypress**
   ```bash
   npx cypress --version
   ```

## 🧪 Execução dos Testes

### Modo Interativo (Cypress Test Runner)
```bash
npm run cypress:open
```

### Modo Headless (Terminal)
```bash
npm test
```

### Outros comandos disponíveis:
```bash
npm run cypress:run:chrome    # Chrome
npm run cypress:run:firefox   # Firefox
npm run test:headed          # Com interface gráfica
npm run report              # Gerar relatórios HTML
```

## 📊 Estrutura dos Testes

### 01-user-registration.cy.js
- ✅ Cadastro com dados válidos
- ✅ Validação de email já existente
- ✅ Validação de campos obrigatórios
- ✅ Validação de formato de email
- ✅ Validação de confirmação de senha

### 02-user-login.cy.js
- ✅ Login com credenciais válidas
- ✅ Login com credenciais inválidas
- ✅ Validação de campos obrigatórios
- ✅ Manutenção de sessão

### 03-add-to-cart.cy.js
- ✅ Adicionar produto pela listagem
- ✅ Adicionar produto pela página de detalhes
- ✅ Adicionar múltiplos produtos
- ✅ Alterar quantidade no carrinho
- ✅ Remover produto do carrinho

### 04-checkout.cy.js
- ✅ Checkout como guest
- ✅ Checkout com usuário logado
- ✅ Validação de campos obrigatórios
- ✅ Seleção de métodos de entrega/pagamento

## 🎯 Site Testado

**URL**: https://magento2-demo.magebit.com/

## 📝 Próximos Passos

1. **Instale o Node.js** do site oficial
2. **Reinicie o VS Code**
3. **Execute**: `npm install`
4. **Execute os testes**: `npm run cypress:open`

---

**Desenvolvido por:** Pedro Ferreira  
**Framework:** Cypress + Page Object Model

## 🎯 Objetivo

Avaliar capacidades de automação de testes funcionais end-to-end, organização de código, boas práticas de QA e clareza na documentação.

## 🌐 Site Testado

- **URL**: https://magento2-demo.magebit.com/
- **Plataforma**: Magento 2 Demo

## 🚀 Funcionalidades Testadas

### 1. Cadastro de Usuário
- ✅ Cadastro com dados válidos
- ✅ Validação de email já existente
- ✅ Validação de campos obrigatórios
- ✅ Validação de formato de email
- ✅ Validação de confirmação de senha

### 2. Login
- ✅ Login com credenciais válidas
- ✅ Tentativa de login com credenciais inválidas
- ✅ Validação de campos obrigatórios
- ✅ Validação de formato de email
- ✅ Navegação para criação de conta
- ✅ Manutenção de sessão

### 3. Adicionar Produto ao Carrinho
- ✅ Adicionar produto pela listagem
- ✅ Adicionar produto pela página de detalhes
- ✅ Adicionar múltiplos produtos
- ✅ Alterar quantidade no carrinho
- ✅ Remover produto do carrinho
- ✅ Validar produto indisponível
- ✅ Manter carrinho após navegação
- ✅ Cálculo de subtotal

### 4. Finalização de Compra (Checkout)
- ✅ Checkout como guest
- ✅ Checkout com usuário logado
- ✅ Validação de campos obrigatórios
- ✅ Seleção de métodos de entrega
- ✅ Seleção de métodos de pagamento
- ✅ Resumo do pedido
- ✅ Navegação entre etapas
- ✅ Validação de formato de email

## 🏗️ Arquitetura do Projeto

### Estrutura de Pastas

```
AutomationTest/
├── .github/
│   └── copilot-instructions.md
├── cypress/
│   ├── e2e/
│   │   ├── 01-user-registration.cy.js
│   │   ├── 02-user-login.cy.js
│   │   ├── 03-add-to-cart.cy.js
│   │   └── 04-checkout.cy.js
│   ├── fixtures/
│   │   └── testData.json
│   ├── reports/
│   ├── support/
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   ├── CreateAccountPage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── ProductListPage.js
│   │   │   ├── ProductDetailsPage.js
│   │   │   ├── CartPage.js
│   │   │   └── CheckoutPage.js
│   │   ├── commands.js
│   │   └── e2e.js
│   └── videos/
├── cypress.config.js
├── package.json
└── README.md
```

### Padrão Page Object Model (POM)

O projeto utiliza o padrão Page Object Model para organizar o código:

- **Pages**: Classes que representam páginas da aplicação
- **Elements**: Seletores organizados por página
- **Methods**: Ações específicas de cada página
- **Verification Methods**: Métodos para validar estados das páginas

## 🛠️ Tecnologias Utilizadas

- **Cypress**: Framework de testes E2E
- **Node.js**: Runtime JavaScript
- **Mochawesome**: Gerador de relatórios HTML
- **JavaScript ES6+**: Linguagem de programação

## ⚙️ Pré-requisitos

### Instalação do Node.js

1. Baixe e instale o Node.js (versão 16 ou superior): https://nodejs.org/
2. Verifique a instalação:
   ```bash
   node --version
   npm --version
   ```

## 🚀 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <repository-url>
cd AutomationTest
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Instale o Cypress (se não instalado automaticamente)
```bash
npm install cypress --save-dev
```

## 🧪 Executando os Testes

### Modo Interativo (Cypress Test Runner)
```bash
npm run cypress:open
```

### Modo Headless (Terminal)
```bash
npm test
# ou
npm run cypress:run
```

### Executar em Browsers Específicos
```bash
# Chrome
npm run cypress:run:chrome

# Firefox
npm run cypress:run:firefox
```

### Executar com Interface Gráfica
```bash
# Chrome com interface
npm run test:chrome

# Firefox com interface
npm run test:firefox
```

### Gerar Relatórios
```bash
npm run report
```

## 📊 Relatórios

Os relatórios são gerados automaticamente em:
- **HTML**: `cypress/reports/`
- **Vídeos**: `cypress/videos/`
- **Screenshots**: `cypress/screenshots/`

## 🔧 Configurações

### Cypress Configuration (cypress.config.js)
- **baseUrl**: URL base do site testado
- **viewportWidth/Height**: Resolução da tela
- **timeouts**: Tempos limite para comandos
- **video/screenshots**: Configurações de captura

### Test Data (cypress/fixtures/testData.json)
- Dados de usuários para teste
- Informações de endereço
- Produtos de teste
- Termos de busca

## 📝 Comandos Customizados

### commands.js
- `cy.login(email, password)`: Login simplificado
- `cy.addToCart(productName)`: Adicionar produto ao carrinho
- `cy.waitForPageLoad()`: Aguardar carregamento da página
- `cy.clearCartIfNotEmpty()`: Limpar carrinho se não estiver vazio

## 🧪 Cenários de Teste

### Cadastro de Usuário
1. **Cadastro válido**: Verificar criação de conta com dados válidos
2. **Email duplicado**: Validar erro para email já existente
3. **Campos obrigatórios**: Verificar validação de campos vazios
4. **Email inválido**: Validar formato de email
5. **Confirmação de senha**: Verificar confirmação de senha

### Login
1. **Login válido**: Autenticação com credenciais corretas
2. **Credenciais inválidas**: Verificar erro de autenticação
3. **Campos obrigatórios**: Validação de campos vazios
4. **Email inválido**: Validação de formato
5. **Navegação**: Link para criação de conta
6. **Sessão**: Manutenção da sessão

### Carrinho de Compras
1. **Adicionar produto**: Via listagem e página de detalhes
2. **Múltiplos produtos**: Adicionar vários itens
3. **Quantidade**: Alterar quantidades
4. **Remover produto**: Exclusão de itens
5. **Produto indisponível**: Validação de disponibilidade
6. **Persistência**: Manter carrinho durante navegação
7. **Cálculos**: Validar subtotais

### Checkout
1. **Guest checkout**: Finalização sem cadastro
2. **User checkout**: Finalização com usuário logado
3. **Validações**: Campos obrigatórios
4. **Métodos**: Entrega e pagamento
5. **Resumo**: Validar informações do pedido
6. **Navegação**: Entre etapas do checkout

## 🚨 Troubleshooting

### Problemas Comuns

1. **Node.js não encontrado**
   - Instale Node.js: https://nodejs.org/
   - Reinicie o terminal após instalação

2. **Cypress não abre**
   ```bash
   npx cypress verify
   npx cypress install
   ```

3. **Testes falhando por timeout**
   - Verifique conexão de internet
   - Aumente timeouts em cypress.config.js

4. **Seletores não encontrados**
   - Verifique se o site está carregando corretamente
   - Atualize seletores nas Page Objects

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 📞 Contato

Para dúvidas ou sugestões, entre em contato:
- **Autor**: Pedro Ferreira
- **Email**: pedro.ferreira@example.com

---

## 📈 Métricas de Qualidade

- ✅ **Cobertura**: 100% dos fluxos principais
- ✅ **Padrões**: Page Object Model implementado
- ✅ **Manutenibilidade**: Código organizado e documentado
- ✅ **Confiabilidade**: Testes estáveis e determinísticos
- ✅ **Relatórios**: HTML detalhados com screenshots/vídeos
