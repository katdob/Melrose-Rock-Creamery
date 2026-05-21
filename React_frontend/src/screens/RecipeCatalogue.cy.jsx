import IceCream from '../assets/ice-cream.svg'
import {
  mountAppRouter,
  navigateTo,
  resetQueryState,
  stubLoggedInSession,
} from '../../cypress/support/test-helpers'

describe('<RecipeCatalogue /> layout', () => {
  let router

  beforeEach(() => {
    resetQueryState()
    stubLoggedInSession()
    router = mountAppRouter()
    navigateTo(router, '/recipe-catalogue/add-new-recipe')
  })

  it('shows the catalogue header and ice cream image', () => {
    const expectedBasename = IceCream.split('/').pop()
    cy.contains('h1', 'MRC Recipe Catalogue').should('exist')
    cy.get('.top-inline img[alt="Ice Cream"]')
      .should('have.attr', 'src')
      .and('include', expectedBasename)
  })

  it('shows Add new recipe, My recipes, and Catalogue tabs', () => {
    cy.get('.tabs a.tab').contains('Add new recipe').should('exist')
    cy.get('.tabs a.tab').contains('My recipes').should('exist')
    cy.get('.tabs a.tab').contains('Catalogue').should('exist')
  })

  it('marks the Add new recipe tab active on that route', () => {
    cy.get('.tabs a.tab--active').should('contain.text', 'Add new recipe')
  })

  it('shows the global recipe search form', () => {
    cy.get('.recipe-catalogue-search-input')
      .should('have.attr', 'placeholder', 'Search recipes by name, author, or ingredient...')
    cy.get('.recipe-catalogue-search-btn').should('contain.text', 'Search')
  })

  it('shows no recipes found when search has no matches', () => {
    cy.intercept('POST', '**/recipes/find', { statusCode: 200, body: [] }).as('findRecipes')
    cy.get('.recipe-catalogue-search-wrap .recipe-catalogue-search-input')
      .scrollIntoView()
      .type('nonexistent-recipe', { force: true })
    cy.get('.recipe-catalogue-search-btn').click({ force: true })
    cy.wait('@findRecipes')
    cy.get('#recipe-search-results').should('contain.text', 'No recipes found')
  })

  it('lists search results and selects a recipe', () => {
    const mockResults = [
      { id: 1, name: 'Test Sundae', author: 'Chef Cypress', createdDate: '2024-01-01' },
    ]
    cy.intercept('POST', '**/recipes/find', { statusCode: 200, body: mockResults }).as('findRecipes')
    cy.get('.recipe-catalogue-search-wrap .recipe-catalogue-search-input')
      .scrollIntoView()
      .type('sundae', { force: true })
    cy.get('.recipe-catalogue-search-btn').click({ force: true })
    cy.wait('@findRecipes')
    cy.get('.recipe-search-dropdown-name').contains('Test Sundae').click()
    cy.get('.recipe-catalogue-search-input').should('have.value', 'Test Sundae')
  })
})
