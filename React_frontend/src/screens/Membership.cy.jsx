import {
  dismissNewsletterPopup,
  mountAppRouter,
  navigateTo,
  resetQueryState,
} from '../../cypress/support/test-helpers'

const FULL_MEMBERSHIP_SNIPPET =
  'With a membership at Melrose Rock Creamery, you will gain access to all of our machines.'

describe('<Membership /> at /membership', () => {
  let router

  beforeEach(() => {
    resetQueryState()
    router = mountAppRouter()
    navigateTo(router, '/membership')
    dismissNewsletterPopup()
  })

  it('shows the opening membership paragraph', () => {
    cy.contains('p', FULL_MEMBERSHIP_SNIPPET).should('exist')
  })

  it('shows training and catalogue highlight links', () => {
    cy.get('.content-scroll .highlight-link').should('have.length.at.least', 3)
    cy.contains('.highlight-link', 'here').should('exist')
    cy.contains('.highlight-link', 'online catalogue').should('exist')
  })

  it('links catalogue of recipes to /recipe-catalogue in a new tab', () => {
    cy.get('a.highlight-link')
      .contains('catalogue of recipes')
      .should('have.attr', 'href', '/recipe-catalogue')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer')
  })
})
