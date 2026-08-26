# 🏥 Sistema de Gerenciamento de Clínicas

Uma aplicação web intuitiva e objetiva desenvolvida para otimizar a rotina operacional e gerencial de consultórios médicos, facilitando a gestão de agendamentos, pacientes e fluxo financeiro.

---

## 📌 Sumário
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Decisões de Arquitetura e UX](#-decisões-de-arquitetura-e-ux)
- [Como Executar o Projeto](#-como-executar-o-projeto)
- [Credenciais de Acesso](#-credenciais-de-acesso)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Processo de Refatoração e Aprendizado](#-processo-de-refatoração-e-aprendizado)
- [Módulos e Páginas do Sistema](#-módulos-e-páginas-do-sistema)

---

## 🚀 Sobre o Projeto

Este projeto foi desenvolvido como resposta ao Case Técnico de Desenvolvimento Front-end para a área da Saúde. O foco principal da solução foi transformar processos complexos de agendamento em telas dinâmicas, limpas e responsivas, oferecendo aos profissionais de saúde e secretários uma visão gerencial centralizada.

---

## 🧰 Funcionalidades Principais

### 1. 📊 Dashboard (Área de Trabalho)
- Métricas em tempo real do dia: **Total de Agendamentos**, **Pacientes Atendidos** e **Faturamento do Dia**.
- Visualização rápida da **Agenda do Dia**.
- Painel interativo de **Avisos e Lembretes** operacionais.

### 2. 📅 Agendamento de Consultas
- Gestão completa da agenda médica: **Criação**, **Edição**, **Cancelamento** e **Transferência** de horários.
- Bloqueio de horários para indisponibilidade médica (férias, reuniões, etc.).
- Formulário de cadastro de paciente com validação de campos obrigatórios (Nome, CPF, Data de Nascimento, Endereço, etc.).
- Módulo de fluxo de pagamento integrado ao processo de agendamento.
- Feedback ao usuário via notificações/toasts e mensagens de erro/sucesso.

### 3. 🔎 Consulta e Gestão de Agendamentos
- Listagem e filtragem de pacientes agendados e atendidos.
- Visualização detalhada dos dados do paciente, médico responsável, agendamento e valores cobrados.
- Edição rápida de informações cadastrais e financeiras diretamente na consulta.

---

## 🛠 Tecnologias Utilizadas

- **React** (v18+) – Biblioteca principal para construção da interface baseada em componentes.
- **HTML5 & CSS3** – Estrutura semântica e estilização customizada.
- **Bootstrap / React-Bootstrap** – Sistema de grid responsivo e componentes base de UI.
- **TypeScript** – Lógica de estado e manipulação de dados.

---

## 💡 Decisões de Arquitetura e UX

- **Componentização Reutilizável:** A aplicação foi estruturada em componentes isolados (Cards de métricas, Modais de agendamento, Tabelas de consulta, Inputs com validação), garantindo facilidade de manutenção e reaproveitamento de código em futuras aplicações.
- **UX Focada na Saúde:** Cores sóbrias e acessíveis (tons de azul e branco), tipografia clara e disposição de elementos focada na redução de cliques para tarefas frequentes.
- **Microinterações:** Adicionadas validações inline nos formulários e alertas visuais de confirmação para ações destrutivas (como cancelamento ou alteração de horário).

---

## 🔧 Como Executar o Projeto

### Passo a Passo

1. **Clonar o repositório:**
   ```
   git clone [https://github.com/Samelafarias/Gerenciamento-de-clinicas.git](https://github.com/Samelafarias/Gerenciamento-de-clinicas.git)
   ```
2. **Acesar a pasta do projeto**
  ```
  cd Gerenciamento-de-clinicas
  ```
3. **Instalar dependências**
  ```
  npm install
  # ou
  yarn install
  ```
  4. **Execução da aplicação**
  ```
  npm start
  # ou
  yarn start (ou npm run dev, caso utilize Vite)
  ```
  5. **Acesar o projeto**
  ```
  http://localhost:5173
  ```

## 📁 Estrutura de Pastas
A organização do código segue o padrão por responsabilidade de camadas, facilitando a navegação e a manutenibilidade do projeto:
```
src/
├── assets/          # Arquivos estáticos (imagens, logotipos e estilos globais)
├── components/      # Componentes de interface reutilizáveis (Modais, Cards, Tabelas, Inputs)
├── context/         # Estado global da aplicação (Context API e persistência de dados)
├── hooks/           # Custom Hooks para abstração de lógicas reutilizáveis
├── pages/           # Visualizações principais/rotas da aplicação (Login, Dashboard, Agendamento, Consulta)
├── routes/          # Configuração e proteção das rotas com React Router DOM
├── services/        # Mocks e simulação de serviços de integração/dados
├── types/           # Interfaces e definições de tipos do TypeScript
└── utils/           # Funções utilitárias e formatadores (máscaras de CPF, moedas e datas)
```

## 🔑 Credenciais de Acesso (MOCK)
Para realizar o login de testes na aplicação, utilize os seguintes dados cadastrados no mock:
- E-mail: ana@consultorio.com

- Senha: 123456

## 🔄 Processo de Refatoração e Aprendizado

- **Evolução da Estilização (CSS-in-JS ➔ Bootstrap):** No início do desenvolvimento, explorei o uso de CSS-in-JS. No entanto, ao reavaliar o contexto do teste e os requisitos solicitados (foco no uso de **Bootstrap** para padronização e reaproveitamento rápido em componentes de UI), realizei uma refatoração no código para alinhar a arquitetura de estilos rigorosamente ao que foi pedido. Essa mudança tornou a aplicação mais leve, consistente com o design system proposto e de fácil manutenção.

## 💻 Módulos e Páginas do Sistema
#### 🔐 Login (/)

- Interface de autenticação simulada para controle de sessão do usuário/operador.

#### 📊 Dashboard / Área de Trabalho (/dashboard)

- Central gerencial com cards de indicadores do dia (Total de Agendamentos, Pacientes Atendidos e Faturamento Total).

- Painel dinâmico da agenda diária e lista de avisos/lembretes operacionais.

#### 📅 Agendamento de Consultas (/agendamento)

- Formulário completo para agendamento com validação de dados do paciente (CPF, endereço, contato).

- Fluxo de pagamento integrado com confirmação da transação.

- Recursos para agendar horários ou registrar bloqueios/ausências médicas.

#### 🔎 Consulta e Gestão (/consultas)

- Tabela de gerenciamento de consultas com suporte à busca e filtros.

- Recursos de microinteração para visualizar detalhes, editar dados cadastrais, alterar pagamentos, transferir horários ou efetuar cancelamentos.


Desenvolvido por Samela Farias 👋👩‍💻
