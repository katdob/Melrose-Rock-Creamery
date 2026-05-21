// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

import { mount } from 'cypress/react'
import {
  dismissNewsletterPopup,
  mountAppRouter,
  navigateTo,
  resetQueryState,
  stubLoggedInSession,
} from './test-helpers'

Cypress.Commands.add('mount', mount)
Cypress.Commands.add('mountAppRouter', mountAppRouter)
Cypress.Commands.add('navigateTo', navigateTo)
Cypress.Commands.add('dismissNewsletterPopup', dismissNewsletterPopup)
Cypress.Commands.add('stubLoggedInSession', stubLoggedInSession)
Cypress.Commands.add('resetQueryState', resetQueryState)

// Example use:
// cy.mount(<MyComponent />)