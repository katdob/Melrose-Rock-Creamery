import {
  mountAppRouter,
  navigateTo,
  resetQueryState,
  stubLoggedInSession,
} from '../../cypress/support/test-helpers'

const mockCatalogueRecipes = [
  {
    id: 10,
    name: 'Catalogue Chocolate',
    author: 'MRC Kitchen',
    ingredients: [{ id: 1, name: 'cocoa', unit: 'tbsp', amount: 2 }],
    instructions: [{ id: 1, order: 1, text: 'Whisk cocoa into milk' }],
  },
]

describe('<Catalogue /> at /recipe-catalogue/catalogue', () => {
  let router

  beforeEach(() => {
    resetQueryState()
    stubLoggedInSession()
    cy.intercept('GET', '**/recipes/search*', { statusCode: 200, body: { results: [] } })
    cy.intercept('GET', '**/recipes?*', { statusCode: 200, body: mockCatalogueRecipes }).as(
      'catalogueRecipes',
    )
    router = mountAppRouter()
    navigateTo(router, '/recipe-catalogue/catalogue')
  })

  it('shows the catalogue search heading and form', () => {
    cy.contains('h3', 'Search for a Recipe!').should('exist')
    cy.get('.catalogue-search-input').should(
      'have.attr',
      'placeholder',
      'Search for recipes by name, author, or ingredient.',
    )
    cy.get('button.recipe-catalogue-search-btn').contains('search').should('exist')
  })

  it('loads and displays catalogue recipes', () => {
    cy.wait('@catalogueRecipes')
    cy.contains('strong', 'Catalogue Chocolate').should('exist')
    cy.contains('span', 'by MRC Kitchen').should('exist')
    cy.get('ul.ingredients-list li').should('contain.text', 'cocoa')
    cy.get('ol.instructions-list li').should('contain.text', 'Whisk cocoa into milk')
  })

  it('shows no recipes found after a search with no matches', () => {
    cy.intercept('GET', '**/recipes/search*', {
      statusCode: 200,
      body: { results: [] },
    }).as('emptySearch')
    cy.get('.content-scroll .catalogue-search-input').type('zzzz-no-match')
    cy.get('.content-scroll button.recipe-catalogue-search-btn').contains('search').click()
    cy.wait('@emptySearch')
    cy.contains('No recipes found.').should('exist')
  })
})
