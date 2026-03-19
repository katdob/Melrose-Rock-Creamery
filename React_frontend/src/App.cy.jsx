import React from 'react'
import App from './App'
import popupImage from './assets/pop-up.jpg'
import iceCreamConeImage from './assets/ice-cream.svg'

describe('<App />', () => {

  // first we test the newsletter popup 
  const submitForm = () => cy.get('button.popup-submit').click()
  const fillForm = (name, email) => {
    if (name) cy.get('#popup-name').type(name)
    if (email) cy.get('#popup-email').type(email)
  }

  beforeEach(() => {
    cy.mount(<App />)
  })

  it('renders the pop up', () => {
    cy.get('.popup-overlay').should('exist')
  })

  it('uses the correct pop up image asset', () => {
    const expectedBasename = popupImage.split('/').pop()
    cy.get('.popup-overlay img[alt="Delicious ice cream"]')
      .should('have.attr', 'src')
      .then((src) => {
        expect(src).to.include(expectedBasename)
      })
  })

  it('shows the popup h2 header text', () => {
    cy.get('.popup-overlay h2').should('have.text', 'Welcome to Melrose Rock Creamery!')
  })

  it('shows the popup p copy', () => {
    cy.get('.popup-overlay p').should('contain.text', 'Please sign up for our newsletter.')
  })

  it('has an input with id "popup-name"', () => {
    cy.get('#popup-name').should('exist')
  })

  it('has an input with id "popup-email"', () => {
    cy.get('#popup-email').should('exist')
  })

  it('has a button with className "popup-submit"', () => {
    cy.get('button.popup-submit').should('exist')
  })

  it('popup-submit button has text "Sign Up"', () => {
    cy.get('button.popup-submit').should('have.text', 'Sign Up')
  })

  it('shows "Please enter your name" when submit is pressed with empty form', () => {
    submitForm()
    cy.get('#popup-name')
      .invoke('prop', 'validationMessage')
      .should('eq', 'Please enter your name.')
  })

  it('shows "Please enter your email" after entering only name', () => {
    fillForm('Example Name')
    submitForm()
    cy.get('#popup-email')
      .invoke('prop', 'validationMessage')
      .should('eq', 'Please enter your email.')
  })

  it('shows "Thank you!" after valid name and email submission', () => {
    fillForm('Example Name', 'example@example.com')
    submitForm()
    cy.contains('h2', 'Thank you!').should('exist')
  })

  it('shows "You\'ve been added to our newsletter." after valid submission', () => {
    fillForm('Example Name', 'example@example.com')
    submitForm()
    cy.contains('p', "You've been added to our newsletter.").should('exist')
  })

  it('popup is not visible after 3 seconds', () => {
    cy.clock()
    fillForm('Example Name', 'example@example.com')
    submitForm()
    cy.tick(3000)
    cy.get('.popup-overlay').should('not.exist')
  })

  // test the header, ice cream cone icon and the h1 text 
  it('uses the correct image for #ice-cream-cone-icon', () => {
    const expectedBasename = iceCreamConeImage.split('/').pop()
    cy.get('#ice-cream-cone-icon')
      .should('have.attr', 'alt', 'Ice Cream')
      .and('have.attr', 'src')
      .then((src) => {
        expect(src).to.include(expectedBasename)
      })
  })

  it('shows "Melrose Rock Creamery" in h1#MRC-header', () => {
    cy.get('h1#MRC-header').should('have.text', 'Melrose Rock Creamery')
  })
})