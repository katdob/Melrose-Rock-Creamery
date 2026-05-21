import recipesPdf from '../../ice-cream-recipes.pdf'
import {
  dismissNewsletterPopup,
  mountAppRouter,
  navigateTo,
  resetQueryState,
} from '../../cypress/support/test-helpers'

const INTRO_TEXT =
  "Here's a free recipe to get you going! You can do this at home, with whatever 2 quart ice cream maker you like."

const BULLET_1 =
  'Never add mix-ins in the ice cream maker. Instead, add them in one layer at a time when you put the ice cream in the container.'

const INSTRUCTION_1 =
  'In a medium bowl, use a hand mixer on low speed or whisk to combine the milk, sugar and salt until the sugar is dissolved. Stir in the heavy cream and vanilla extract. Cover and refrigerate a minimum of 2 hours, preferably overnight. Whisk mixture together again before continuing.'

describe('<Recipes /> at /recipes', () => {
  let router

  beforeEach(() => {
    resetQueryState()
    router = mountAppRouter()
    navigateTo(router, '/recipes')
    dismissNewsletterPopup()
  })

  it('shows the intro text', () => {
    cy.contains('p', INTRO_TEXT).should('exist')
  })

  it('shows Recommendations with three bullet points', () => {
    cy.contains('strong', 'Recommendations:').should('exist')
    cy.contains('strong', 'Recommendations:')
      .parent('p')
      .next('ul')
      .find('li')
      .should('have.length', 3)
    cy.contains('li', BULLET_1).should('exist')
  })

  it('shows Simple Vanilla Ice Cream at #recipe-1', () => {
    cy.get('#recipe-1').should('contain.text', 'Simple Vanilla Ice Cream')
  })

  it('lists five ingredients under Ingredients', () => {
    cy.get('ul.ingredients-list li').should('have.length', 5)
    cy.contains('li', '1 cup whole milk').should('exist')
    cy.contains('li', '1 tablespoon pure vanilla extract').should('exist')
  })

  it('shows numbered instructions', () => {
    cy.get('ol.instructions-list li').should('have.length', 2)
    cy.get('ol.instructions-list li').first().should('contain.text', INSTRUCTION_1)
  })

  it('links the Cuisinart booklet PDF', () => {
    const expectedBasename = recipesPdf.split('/').pop()
    cy.get('a.highlight-link')
      .contains('here')
      .should('have.attr', 'href')
      .and('include', expectedBasename)
  })
})
