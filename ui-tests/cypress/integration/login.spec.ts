// / <reference types="cypress" />
import {user} from '../../../test-framework-lib/test-factories/index';

describe('User login', () => {
  context('Successfully logs in', () => {
    const fakeUser = user();

    beforeEach(() => {
      cy.visit('/');
      cy.interceptLogin('logIn');
      cy.login(fakeUser);
    });

    describe('Scenario: User succesfully logs in', () => {
      describe('Given the user has an account', () => {
        describe('When they submit there details', () => {
          describe('Then they should be logged in', () => {
            it('And the response code should be 200 OK', () => {
              cy.wait('@logIn').then((inter) => {
                /* I'm assuming the authentication is JWT
                  So let's check the JWT access token is returned
                  There could also be a request to set the JWT token in
                  a cookie using the Set-Cookie header.
                  This cookie can be used to authenticate subsequent
                  requests. This cookie should be HTTP only
                  and not available on the browser via JS
                  for security reasons.
                */
                const statusCode = inter.response.statusCode;
                const body = inter.response.body;
                const headers = inter.response.headers; 
                expect(statusCode).to.eql(200);
                expect(body).to.have.property('access-token');
                expect(headers).to.have.property('set-cookies', 'access-token');                
              });
            });
          });
        });
      });
    });
  });
  context('Unsuccessfully logs in', () => {
    let fakeUser = user();
    fakeUser.email = 'wrong-email@wrong-email.com';
    fakeUser.password = 'not-a-password';
    
    beforeEach(() => {
      cy.visit('/');
      cy.interceptLogin('logIn');
      cy.login(fakeUser);
    });

    describe('Scenario: User enters the wrong username and password', () => {
      describe('Given the user the wrong username and password', () => {
          describe('Then they should get a message telling them their details are incorrect', () => {
            it('And the response code should be 401 Unauthorized', () => {
              cy.wait('@logIn').then((inter) => {
                const statusCode = inter.response.statusCode;
                const body = inter.response.body;
                expect(body.error).to.have.property('description', 'Incorrect username or password.');  
                expect(statusCode).to.eql(401);
                cy.get('[data-test="component-Errors"]').contains('Incorrect username or password');
              });
            });
          });
      });
    });
  });
});
