import {
  dismissNewsletterPopup,
  mountAppRouter,
  navigateTo,
  resetQueryState,
} from '../../cypress/support/test-helpers'

const WELCOME_TEXT =
  'Welcome to Melrose Rock Creamery! Our tasting room is open from 10am - 2pm and 6pm - 11pm every day.'

const VANILLA_INGREDIENTS = [
  'whole milk',
  'granulated sugar',
  'salt flakes',
  'heavy cream',
  'pure vanilla extract',
]

describe('<Menu /> at /menu', () => {
  let router

  beforeEach(() => {
    resetQueryState()
    router = mountAppRouter()
    navigateTo(router, '/menu')
    dismissNewsletterPopup()
  })

  it('shows the welcome and hours text', () => {
    cy.contains('p', WELCOME_TEXT).should('exist')
  })

  it('shows the Available Flavors heading', () => {
    cy.get('h2').contains('Available Flavors').should('exist')
  })

  it('lists Simple Vanilla Ice Cream in the menu', () => {
    cy.get('ul.menu-list').contains('li', 'Simple Vanilla Ice Cream').should('exist')
  })

  it('shows all vanilla ingredients in the tooltip on hover', () => {
    cy.get('ul.menu-list')
      .contains('li', 'Simple Vanilla Ice Cream')
      .find('.ingredient-icon')
      .trigger('mouseover')

    VANILLA_INGREDIENTS.forEach((ingredient) => {
      cy.get('.ingredient-tooltip').contains('li', ingredient).should('exist')
    })
  })

  it('lists all 21 menu flavors', () => {
    cy.get('ul.menu-list > li').should('have.length', 21)
  })
})
