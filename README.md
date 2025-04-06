# Testes Automatizados com Cypress - Sistema de Gestão Financeira

## Visão Geral
Este projeto utiliza o **Cypress** para realizar testes automatizados em um site de gestão financeira (FinanceDev) que lista entradas e saídas, calcula o saldo total e exibe as transações em ordem de inserção. O objetivo foi validar a funcionalidade do sistema, identificar bugs e propor melhorias para aprimorar a experiência do usuário e a confiabilidade do software.

![Video geral](/cypress/videos/bateria-testes-completos.gif)

## Funcionalidades Testadas
- **Inserção de Dados:** Teste de adição de entradas e saídas no sistema. _*(it1, it2)*_
- **Remoção de Dados:** Teste de exclusão de entradas e saídas no sistema. _*(it3)*_
- **Listagem de Transações:** Confirmação de que as transações são exibidas na tabela. _*(it1, it2, it3, it4)*_
- **Cálculo do Saldo Total:** Verificação se o saldo reflete corretamente a soma das entradas menos as saídas. _*(it4)*_

## Tecnologias Utilizadas
- **Cypress:** Framework de testes end-to-end.
- **JavaScript:** Linguagem usada para escrever os testes.
- **Node.js:** Ambiente de execução.

## Como Executar os Testes
1. **Pré-requisitos:**
   - Node.js instalado (versão 12 ou superior).
   - Dependências do projeto instaladas (`npm install`).

2. **Instalação:**
   ```bash
   npm install cypress --save-dev
   ```

3. **Rodar os Testes**
- Modo Interativo:
    ```bash
    npx cypress open
    ```
- Modo headless (linha de comando):
    ```bash
    npx cypress run
    ```

## Bugs Identificados

### **Bug #1 [HotFix] - Cadastro de Transação com Valor Zero**
- **Descrição:** O sistema permite o cadastro de uma transação (entrada ou saída) com valor igual a R$0, o que não deveria ser permitido, pois não afeta o saldo e polui a listagem.
- **Evidência Atual**
![Bug](/cypress/screenshots/bug1-erro.png)
- **Passos para Reproduzir:**
    1. Acesse o site FinanceDev.
    2. Clique em "+ Nova Transação".
    3. Insira uma descrição qualquer, valor R$0 e uma data válida.
    4. Clique em "Salvar" o cadastro e verifique a tabela de transações.
- **Comportamento Esperado:** O sistema deve bloquear o cadastro exibindo uma mensagem que o valor deve ser diferente de 0 (zero).
- **Comportamento Observado:** A transação com valor R$0 é cadastrada normalmente e aparece na listagem.
- **Prioridade:** Baixa
- **Time:** FrontEnd + BackEnd

## Sugestões de Melhorias

### **Melhoria #1: Cor de Fundo do Saldo Baseada no Valor**
- **Descrição:** Atualmente, o saldo tem fundo verde fixo, mesmo quando está zerado ou negativo. Isso não reflete visualmente o estado financeiro.
- **Evidência Atual**
![Cor do saldo atual](/cypress/screenshots/melhoria1-tela-atual.png)
- **Benefício:** Facilitar a interpretação rápida do saldo pelo usuário com cores intuitivas.
- **Passos para Reproduzir:**
    1. Acesse o site FinanceDev.
    2. Adicione uma nova transação de valor positivo ou negativo.
- **Solução Proposta:**
    - Ao calcular o saldo das transações, quando o saldo estiver zerado (== R$0), colocar um Fundo cinza.
    ![Cor do saldo zerado](/cypress/screenshots/melhoria1-saldo-zerado.png)
    - Ao calcular o saldo das transações, quando o saldo estiver negativo (< R$0), colocar um Fundo Vermelho.
    ![Cor do saldo negativo](/cypress/screenshots/melhoria1-saldo-negativo.png)
    - Ao calcular o saldo das transações, quando o saldo estiver positivo (> R$0), colocar um Fundo Verde.
    ![Cor do saldo positivo](/cypress/screenshots/melhoria1-saldo-positivo.png)
    - Implementar lógica no front-end para alterar a classe CSS com base no valor do saldo.
- **Prioridade:** Média
- **Time:** FrontEnd

### **Melhoria #2: Implementação de Filtragem de Transações**
- **Descrição:** A tabela de transações não possui uma opção de filtragem, dificultando a localização de transações específicas em listas longas.
- **Evidência Atual**
![Tela atual](/cypress/screenshots/melhoria2-tela-atual.png)
- **Benefício:** Permitir que o usuário encontre rapidamente transações por critérios como data, valor ou tipo (entrada/saída), melhorando a usabilidade e análise de dados.
- **Passos para Reproduzir:**
    1. Acesse o site FinanceDev.
    2. Digite algum critério/valor que deseja procurar na tabela
    3. Clique no botão "Filtrar".
- **Solução Proposta:**
    - Adicionar campos de filtro acima da tabela (ex.: intervalo de datas, valor mínimo/máximo, dropdown para entrada/saída).
    ![Botao de filtragem](/cypress/screenshots/melhoria2-botao-filtragem.png)
    - Implementar uma função no back-end e front-end para filtrar os dados com base nos critérios selecionados e atualizar a tabela dinamicamente.
- **Prioridade:** Alta
- **Time:** FrontEnd e BackEnd

### **Melhoria #3: Implementação de Ordenação com Base nas Colunas da Tabela**
- **Descrição:** A tabela de transações não possui uma opção de filtragem, dificultando a localização de transações específicas em listas longas.
- **Evidência Atual**
![Tela Atual](/cypress/screenshots/melhoria3-tela-atual.png)
- **Benefício:** Facilitar a organização visual dos dados pelo usuário, permitindo ordenação ascendente ou descendente por qualquer coluna.
- **Passos para Reproduzir:**
    1. Acesse o site FinanceDev.
    2. Clique em cima do título de alguma cpluna da tabela (Descrição, Valor, Data).
- **Solução Proposta:**
    - Tornar os cabeçalhos das colunas clicáveis, alternando entre ordenação ascendente (A-Z, menor-maior) e descendente (Z-A, maior-menor).
    - Adicionar ícones visuais (ex.: setas ↑↓) para indicar a direção da ordenação.
    ![cabecalho clicaveis](/cypress/screenshots/melhoria3-cabecalhos.png)
    - Implementar a lógica de ordenação no front-end (ex.: usando JavaScript com sort()) ou no back-end, dependendo de onde os dados são processados.
- **Prioridade:** Alta
- **Time:** FrontEnd e BackEnd

## Resultados
- **Testes Automatizados:** 100% das funcionalidades principais cobertas.
- **Bugs Reportados:** 1 identificados e documentados.
- **Melhorias Propostas:** 3 sugeridas para otimização do sistema.

## Autor
- **Nome:** Lucas Matheus de Camargo
- **Contato:** [Meu LinkedIn](https://www.linkedin.com/in/lucas-matheus-de-camargo-49a315236/) / [Meu Instagram](https://www.instagram.com/_lucasm_camargo/) / 46 991317674