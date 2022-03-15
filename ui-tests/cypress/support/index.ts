// Import commands.js using ES2015 syntax:
import './commands';
import {User} from '../../../test-framework-lib/types';

// load type definitions that come with Cypress module
// / <reference types="cypress" />
declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Cypress {
    // eslint-disable-next-line no-unused-vars
    interface Chainable {
      interceptLogin(alias: string): void;
      login(user: User): void;
    }
  }
}
