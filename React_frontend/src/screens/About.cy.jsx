import {
  dismissNewsletterPopup,
  mountAppRouter,
  navigateTo,
  resetQueryState,
} from '../../cypress/support/test-helpers'

describe('<About /> route content', () => {
  let router

  beforeEach(() => {
    resetQueryState()
    router = mountAppRouter()
    navigateTo(router, '/about')
    dismissNewsletterPopup()
  })

  it('shows the welcome text', () => {
    cy.get('#welcome-text')
      .should('exist')
      .and('have.text', 'Welcome to Melrose Rock Creamery!')
  })

  it('shows the description text', () => {
    cy.get('#description-text')
      .should('exist')
      .and('have.text', 'We are more than a make-believe ice cream shop. We\'re also your local makerspace, but for frozen treats! You can make and sell your ice cream here in a pop-up format. Or, you can make your recipes for our Super Scoopers to serve to customers. This includes milkshakes, sundaes, floats, and more.')
  })

  it('shows the hours text', () => {
    cy.get('#hours-text')
      .should('exist')
      .and('have.text', 'Our tasting room is open from 10am - 2pm and 6pm - 11pm every day.')
  })

  it('shows the membership text and "here" link', () => {

    cy.get('#membership-text')
      .should('exist')
      .and('have.text', 'To use the purely fictional facilities at Melrose Rock Creamery, you must be a member. We charge a monthly membership fee. See the details of using our kitchen here.')
  })

  it('shows the rules/qualifications/apply text', () => {

    cy.get('#rqa-text')
      .should('exist')
      .and('have.text', 'We also have rules and qualifications that you must abide by to be a member. Apply now!')
  })
})
