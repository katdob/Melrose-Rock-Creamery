import React from 'react'
import App from './App'
import popupImage from './assets/pop-up.jpg'

describe('<App />', () => {
  it('renders the pop up', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<App />)
  })

  it('shows the correct pop up image', () => {
    cy.mount(<App />)

    cy.get('.popup-overlay img[alt="Delicious ice cream"]')
      .should('have.attr', 'src')
      .and('match', /pop-up.*\.jpg/i)
  })

  it('uses the correct pop up image asset', () => {
    cy.mount(<App />)

    const expectedBasename = popupImage.split('/').pop()

    cy.get('.popup-overlay img[alt="Delicious ice cream"]')
      .should('have.attr', 'src')
      .then((src) => {
        expect(src).to.include(expectedBasename)
      })
  })

  it('4. shows the popup h2 header text', () => {
    cy.mount(<App />)

    cy.get('.popup-overlay h2')
      .should('have.text', 'Welcome to Melrose Rock Creamery!')
  })

  it('shows the popup p copy', () => {
    cy.mount(<App />)
    cy.get('.popup-overlay p').should('contain.text', 'Please sign up for our newsletter.')
  })

  it('has an input with id "popup-name"', () => {
    cy.mount(<App />)
    cy.get('#popup-name').should('exist')
  })

  it('has an input with id "popup-email"', () => {
    cy.mount(<App />)
    cy.get('#popup-email').should('exist')
  })

  it('has a button with className "popup-submit"', () => {
    cy.mount(<App />)
    cy.get('button.popup-submit').should('exist')
  })

  it('popup-submit button has text "Sign Up"', () => {
    cy.mount(<App />)
    cy.get('button.popup-submit').should('have.text', 'Sign Up')
  })

  it('popup-submit button is --plush-light-medium-pink when not hovered', () => {
    cy.mount(<App />)
    // --plush-light-medium-pink is #DBAFC1 => rgb(219, 175, 193)
    // cy.get('button.popup-submit').should('have.css', 'background', 'rgb(219, 175, 193)')
    cy.get('button.popup-submit').should('have.css', 'background', '#DBAFC1')
  })

  it('popup-submit button is --dark-dusty-rose when hovered', () => {
    cy.mount(<App />)
    // --dark-dusty-rose is #86626E => rgb(134, 98, 110)
    cy.get('button.popup-submit')
      .trigger('mouseover')
      // .should('have.css', 'background', 'rgb(134, 98, 110)')
      // .should('have.css', 'background', '#86626E')
      .should('have.css', 'background', 'var(--dark-dusty-rose)')
  })

  it('shows "Please enter your name" when submit is pressed with empty name', () => {
    cy.mount(<App />)
    cy.get('button.popup-submit').click()
    cy.get('#popup-name')
      .invoke('prop', 'validationMessage')
      .should('eq', 'Please enter your name.')
  })

  it('after entering name, shows "Please enter your email" when email is empty', () => {
    cy.mount(<App />)
    cy.get('#popup-name').type('Example Name')
    cy.get('button.popup-submit').click()
    cy.get('#popup-email')
      .invoke('prop', 'validationMessage')
      .should('eq', 'Please enter your email.')
  })

  it('shows "Thank you!" after valid name and email submission', () => {
    cy.mount(<App />)
    cy.get('#popup-name').type('Example Name')
    cy.get('#popup-email').type('example@example.com')
    cy.get('button.popup-submit').click()
    cy.contains('h2', 'Thank you!').should('exist')
  })

  it('shows "You\'ve been added to our newsletter." after valid submission', () => {
    cy.mount(<App />)
    cy.get('#popup-name').type('Example Name')
    cy.get('#popup-email').type('example@example.com')
    cy.get('button.popup-submit').click()
    cy.contains('p', "You've been added to our newsletter.").should('exist')
  })

  it('popup is not visible after 3 seconds', () => {
    cy.clock()
    cy.mount(<App />)
    cy.get('#popup-name').type('Example Name')
    cy.get('#popup-email').type('example@example.com')
    cy.get('button.popup-submit').click()
    cy.tick(3000)
    cy.get('.popup-overlay').should('not.exist')
  })

})