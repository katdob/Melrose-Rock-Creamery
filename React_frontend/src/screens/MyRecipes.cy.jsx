import {
  mountAppRouter,
  navigateTo,
  resetQueryState,
  stubLoggedInSession,
} from '../../cypress/support/test-helpers'

const mockRecipes = [
  {
    id: 1,
    name: 'My Vanilla',
    author: 'Cypress Tester',
    ingredients: [{ id: 1, name: 'milk', unit: 'cup', amount: 1 }],
    instructions: [{ id: 1, order: 1, text: 'Mix and freeze' }],
  },
]

describe('<MyRecipes /> at /recipe-catalogue/my-recipes', () => {
  let router

  beforeEach(() => {
    resetQueryState()
    stubLoggedInSession()
    cy.intercept('GET', '**/recipes/my*', { statusCode: 200, body: mockRecipes }).as('myRecipes')
    router = mountAppRouter()
    navigateTo(router, '/recipe-catalogue/my-recipes')
  })

  it('shows the My Recipes heading', () => {
    cy.contains('h2', 'My Recipes').should('exist')
  })

  it('loads and displays the user recipe', () => {
    cy.wait('@myRecipes')
    cy.contains('strong', 'My Vanilla').should('exist')
    cy.contains('div', 'by Cypress Tester').should('exist')
    cy.get('ul.ingredients-list li').should('contain.text', 'milk')
    cy.get('ol.instructions-list li').should('contain.text', 'Mix and freeze')
  })

  it('shows empty state when the user has no recipes', () => {
    cy.intercept('GET', '**/recipes/my*', { statusCode: 200, body: [] }).as('emptyRecipes')
    resetQueryState()
    stubLoggedInSession()
    router = mountAppRouter()
    navigateTo(router, '/recipe-catalogue/my-recipes')
    cy.wait('@emptyRecipes')
    cy.contains('p', 'You have not created any recipes yet.').should('exist')
  })
})
