const API_BASE_URL = Cypress.env('API_BASE_URL') ;

Cypress.Commands.add('interceptLogin', (alias='login') => {
  cy.intercept('POST', `${API_BASE_URL}/auth/login`).as(alias);
});

Cypress.Commands.add('login', (user) => {
  cy.get('[data-test="input-username"]').type(user.email);
  cy.get('[data-test="input-password"]').type(user.password);
  cy.get('[data-test="button-submit"]').click();
});
