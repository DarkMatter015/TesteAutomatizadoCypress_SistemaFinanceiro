/// <reference types="cypress" />

import { format, prepareLocalStorage, randomNumber } from "../support/util";

describe("Dev Finance testes", () => {
  // hooks
  // codigo que executa antes e depois de testes
  // before -> antes de todos os testes
  // beforeEach -> antes de cada teste
  // after -> depois de todos os testes
  // afterEach -> depois de cada teste

  beforeEach(() => {
    // Teste mobile do site - cy.viewport, arquivos de cofig, configs por linha de comando
    // cy.viewport(411, 823)

    cy.visit("https://dev-finance.netlify.app/", {
      onBeforeLoad: (win) => {
        // Otimiza o tempo de execução dos testes já instanciando itens na listagem através do LocalStorage
        prepareLocalStorage(win);
      },
    });

    // cy.get('#data-table tbody tr').should('have.length', 0) // se não houvesse o prepareLocalStorage poderia ter uma validação inicial de que a tabela está vazia antes de todo teste
  });

  // Cadastrar Entradas
  it("Cadastrar Entradas", () => {
    cy.get("#transaction .button").click(); // id + classe
    cy.get("#description").type("Salario"); // id
    cy.get("[name=amount]").type(1800); // atributo
    cy.get("[type=date]").type("2025-04-04"); // atributo
    cy.get("button").contains("Salvar").click(); // tipo e valor

    cy.get("#data-table tbody tr").should("have.length", 3); // valida o tamanho da tabela após inserção
  });

  // Cadastrar saídas
  it("Cadastrar Saídas", () => {
    cy.get("#transaction .button").click(); // id + classe
    cy.get("#description").type("Chocolate"); // id
    cy.get("[name=amount]").type(-12); // atributo
    cy.get("[type=date]").type("2025-04-04"); // atributo
    cy.get("button").contains("Salvar").click(); // tipo e valor

    cy.get("#data-table tbody tr").should("have.length", 3); // valida o tamanho da tabela após inserção
  });

  // Remover Entradas e Saídas
  it("Remover Entradas e Saídas", () => {
    const entrada = "Mesada";
    const saida = "Suco Kapo";

    // TESTE COM INSERÇÃO MANUAL AUTOMATIZADA
    // CADASTRANDO ENTRADA
    // cy.get('#transaction .button').click() // id + classe
    // cy.get('#description').type(entrada) // id
    // cy.get("[name=amount]").type(100) // atributo
    // cy.get("[type=date]").type("2025-04-04") // atributo
    // cy.get('button').contains('Salvar').click() // tipo e valor

    // CADASTRANDO SAIDA
    // cy.get('#transaction .button').click() // id + classe
    // cy.get('#description').type(saida) // id
    // cy.get("[name=amount]").type(-35) // atributo
    // cy.get("[type=date]").type("2025-04-04") // atributo
    // cy.get('button').contains('Salvar').click() // tipo e valor

    // estratégia 1 - encontrar elemento pelo nome(conteudo) e voltar para o pai e clicar na img
    cy.get("td.description")
      .contains(entrada)
      .parent()
      .find("img[onclick*=remove]") // pega a tag img com o atributo onclick que possui uma função remove
      .click();

    cy.get("#data-table tbody tr").should("have.length", 1);

    // estrategia 2: buscar todos os irmãos do elemento e buscar pelo img + atributo
    cy.get("td.description")
      .contains(saida)
      .siblings()
      .children("img[onclick*=remove]")
      .click();

    cy.get("#data-table tbody tr").should("have.length", 0);
  });

  it("Validar saldo com várias transações", () => {
    // TESTE COM INSERÇÃO MANUAL AUTOMATIZADA
    // const entrada = "Ganho"
    // const saida = "Perda"

    // CADASTRANDO ENTRADAS
    // cy.get('#transaction .button').click() // id + classe
    // cy.get('#description').type(entrada) // id
    // cy.get("[name=amount]").type(100) // atributo
    // cy.get("[type=date]").type("2025-04-04") // atributo
    // cy.get('button').contains('Salvar').click() // tipo e valor

    // cy.get('#transaction .button').click() // id + classe
    // cy.get('#description').type(entrada) // id
    // cy.get("[name=amount]").type(10) // atributo
    // cy.get("[type=date]").type("2025-04-04") // atributo
    // cy.get('button').contains('Salvar').click() // tipo e valor

    // CADASTRANDO SAIDAS
    // cy.get('#transaction .button').click() // id + classe
    // cy.get('#description').type(saida) // id
    // cy.get("[name=amount]").type(-35) // atributo
    // cy.get("[type=date]").type("2025-04-04") // atributo
    // cy.get('button').contains('Salvar').click() // tipo e valor

    // cy.get('#transaction .button').click() // id + classe
    // cy.get('#description').type(saida) // id
    // cy.get("[name=amount]").type(-95,3) // atributo
    // cy.get("[type=date]").type("2025-04-04") // atributo
    // cy.get('button').contains('Salvar').click() // tipo e valor

    // capturar as linhas de transações
    let entradas = 0;
    let saidas = 0;

    // capturar textos das colunas
    cy.get("#data-table tbody tr").each(($el, index, $list) => {
      cy.log(index);
      cy.get($el)
        .find("td.income, td.expense")
        .invoke("text")
        .then((texto) => {
          // pegar e formatar valores dessas linhas
          if (texto.includes("-")) {
            entradas += format(texto);
          } else {
            saidas += format(texto);
          }
        });
    });

    // somar entradas e saidas
    // capturar texto do total
    cy.get("#totalDisplay")
      .invoke("text")
      .then((total) => {
        let totalFormatado = format(total);
        let totalEsperado = entradas + saidas;

        // validar o cálculo do saldo
        expect(totalFormatado).to.eq(totalEsperado);
      });
  });
});
