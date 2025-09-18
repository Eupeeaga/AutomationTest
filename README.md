# Projeto de Automação de Testes em Cypress - Magento Demo

Este projeto contém automação de testes end-to-end para o site de demonstração do Magento usando Cypress e o padrão Page Object Model (POM).

## 🚀 Funcionalidades Testadas

O projeto implementa um fluxo completo de compra, incluindo:
- Cadastro de novo usuário
- Login com bypass de CAPTCHA
- Seleção de produto com variações (tamanho e cor)
- Adição ao carrinho
- Processo de checkout completo
- Validação de sucesso da compra

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- NPM (incluído com Node.js)
- Navegador Chrome, Firefox ou Edge

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Eupeeaga/AutomationTest.git
```

2. Instale as dependências:
```bash
npm install
```

## ⚡ Execução dos Testes

### Modo Interativo (Interface Visual)
```bash
npm run cypress:open
```
- Aguardar a abertura do Cypress **Test Runner**.
- Selecionar o tipo de execução **E2E Testing**.
- Escolher o **navegador** desejado **(Chrome, Edge, Electron, etc.)**.
- Selecionar o teste **complete-purchase-flow.cy.js**.
- Acompanhar a execução dos testes em tempo real.
- Analisar os resultados (✓ sucesso / ✗ falha) e logs de depuração.

### Modo Headless (CLI)
```bash
npm run cypress:run
```

Para executar um teste específico:
```bash
npx cypress run --spec "cypress/e2e/complete-purchase-flow.cy.js"
```

## 🏗️ Estrutura do Projeto

```
cypress/
├── downloads/           # Downloads gerados durante os testes
├── e2e/                # Arquivos de teste end-to-end
│   └── complete-purchase-flow.cy.js
├── fixtures/           # Dados de teste
│   └── testData.json
├── reports/           # Relatórios de execução
├── screenshots/       # Screenshots de falhas
├── support/          # Arquivos de suporte
│   ├── commands.js
│   ├── e2e.js
│   └── pages/        # Page Objects
│       ├── CartPage.js
│       ├── CheckoutPage.js
│       ├── CreateAccountPage.js
│       ├── HomePage.js
│       ├── LoginPage.js
│       ├── ProductDetailsPage.js
│       └── ProductListPage.js
└── videos/           # Gravações das execuções
```

## 📝 Padrões Utilizados

- **Page Object Model (POM)**: Padrão para melhor organização e reusabilidade do código
- **Data-Driven Testing**: Uso de fixtures para dados de teste
- **Custom Commands**: Comandos personalizados do Cypress para ações comuns
- **Automatic Retries**: Retry automático em elementos instáveis
- **Screenshots e Vídeos**: Geração automática para falhas

## 🔍 Solução de CAPTCHA

O projeto implementa uma solução de bypass do CAPTCHA através da interceptação de requisições usando o Cypress, permitindo:
- Interceptação da requisição de login
- Modificação dos parâmetros do CAPTCHA
- Simulação de validação bem-sucedida

## 📊 Relatórios

Os testes geram automaticamente:
- Screenshots em caso de falhas
- Vídeos das execuções
- Relatórios em formato HTML
- Logs detalhados no console
