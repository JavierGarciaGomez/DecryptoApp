describe("My First Test", () => {
  before(() => {
    cy.visit("http://localhost:4200/");
    // click the paginator to show 250 elements
    cy.get(".mat-select-arrow-wrapper").click();
    cy.get("#mat-option-2").click();
  });
  beforeEach(() => {});

  it("There is at least one cryptorow", () => {
    // expect(true).to.equal(true);
    cy.get(".crypto-row").its("length").should("be.gt", 1);
    // click the paginator to show 250 elements
  });

  it("The marketcap value of the first row is the highest of all the rows", () => {
    let allValues = [];
    let firstValue = 0;

    // get the value of the first row
    cy.get("tbody > tr")
      .find(".mat-column-market_cap")
      .eq(0)
      .invoke("text")
      .then((value) => (firstValue = value));

    // get the values of all the rows
    cy.get("tbody > tr")
      .find(".mat-column-market_cap")
      .each(($el, $index) => {
        cy.wrap($el)
          .invoke("text")
          .then((text) => {
            allValues.push(text.trim());
          });
      })
      .then(() => {
        let firstValueAsNumber = cleanTheNumber(firstValue);
        let valuesAsNumber = allValues.map((value) => cleanTheNumber(value));
        cy.log({ firstValueAsNumber, valuesAsNumber });
        let maxValue = Math.max(...valuesAsNumber);
        // Assertion
        expect(firstValueAsNumber).equal(maxValue);
      });
  });

  it("The price change is green if positive and red if negative", () => {
    // get the values of all the rows
    cy.get("tbody > tr")
      .find(".mat-column-price_change_percentage_24h")
      .each(($el, $index) => {
        cy.wrap($el)
          .invoke("text")
          .then((text) => {
            let numberValue = cleanTheNumber(text);
            if (numberValue >= 0) {
              cy.get($el).should("have.class", "up");
            } else {
              cy.get($el).should("have.class", "down");
            }
          });
      });
  });

  it("Check if before the price there is a dollar sign ($)", () => {
    cy.get("tbody > tr")
      .find(".mat-column-current_price")
      .each(($el, $index) => {
        cy.wrap($el)
          .invoke("text")
          .then((text) => {
            cy.log(text);
            expect(text.includes("$")).to.be.true;
          });
      });
  });
});

// 1 que al cargar la página se cargue al menos 1 elemento de la tabla.

// 2 que el primer elemento de la lista sea el que mayor capitalización de mercado tenga (para comprobar ordenación descendente)

// 3 que el cambio de precio durante las 24 últimas horas aparezca verde si es positivo o rojo si es negativo (columna 24H %)

// 4 comprobar que junto al precio de cada criptomoneda salga el símbolo del dólar (ej. $50000)

const cleanTheNumber = (currency) => {
  return Number(currency.replace(/[^0-9.-]+/g, ""));
};
