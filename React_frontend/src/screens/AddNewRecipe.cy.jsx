import {
  mountAppRouter,
  navigateTo,
  resetQueryState,
  stubLoggedInSession,
} from '../../cypress/support/test-helpers'

describe('<AddNewRecipe /> at /recipe-catalogue/add-new-recipe', () => {
  let router

  beforeEach(() => {
    resetQueryState()
    stubLoggedInSession()
    router = mountAppRouter()
    navigateTo(router, '/recipe-catalogue/add-new-recipe')
  })

  it('renders the recipe form fields', () => {
    cy.get('#recipe-name').should('have.attr', 'placeholder', 'Enter recipe name')
    cy.get('#recipe-author').should('have.attr', 'placeholder', 'Enter author name')
    cy.contains('h3', 'Ingredients').should('exist')
    cy.contains('h3', 'Instructions').should('exist')
    cy.contains('button', 'Add new recipe').should('exist')
  })

  it('shows validation errors when required fields are empty', () => {
    cy.contains('button', 'Add new recipe').click()
    cy.get('.add-recipe-error')
      .should('exist')
      .and('contain.text', 'Name is required.')
      .and('contain.text', 'Author is required.')
  })

  it('adds another ingredient row', () => {
    cy.contains('button', 'Add another ingredient').click()
    cy.get('#ingredient-name-1').should('exist')
  })

  it('submits a recipe and shows the success popup', () => {
    cy.intercept('POST', '**/recipes', {
      statusCode: 200,
      body: {
        id: 42,
        name: 'Cypress Swirl',
        author: 'Cypress Tester',
        createdDate: '2024-06-01',
        shareable: true,
        creatingUser: 1,
      },
    }).as('postRecipe')
    cy.intercept('POST', '**/ingredients', {
      statusCode: 200,
      body: { id: 1 },
    }).as('postIngredient')
    cy.intercept('POST', '**/instructions', {
      statusCode: 200,
      body: { id: 1 },
    }).as('postInstruction')

    cy.get('#recipe-name').type('Cypress Swirl')
    cy.get('#recipe-author').type('Cypress Tester')
    cy.get('#ingredient-name-0').type('cream')
    cy.get('#ingredient-unit-0').type('cup')
    cy.get('#ingredient-amount-0').type('2')
    cy.get('#instruction-text-0').type('Churn until thick')
    cy.get('#instruction-order-0').type('1')
    cy.contains('button', 'Add new recipe').click()

    cy.wait('@postRecipe')
    cy.get('.popup-overlay[role="dialog"]').should('contain.text', 'Recipe created')
    cy.get('#recipe-created-title').should('have.text', 'Recipe created')
    cy.get('.recipe-created-popup').should('contain.text', 'Cypress Swirl')
    cy.contains('button', 'OK').click()
    cy.get('.popup-overlay[role="dialog"]').should('not.exist')
  })
})
