import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from '../routeTree.gen'

/**
 * Renders the app at /menu so the main layout (and newsletter popup) are visible.
 */
async function renderMenuPage() {
  const router = createRouter({ routeTree })
  render(<RouterProvider router={router} />)
  await act(async () => {
    await router.navigate({ to: '/menu' })
  })
  return router
}

describe('Newsletter popup when /menu page renders', () => {
  beforeEach(async () => {
    await renderMenuPage()
  })

  it('1. shows the popup', () => {
    expect(screen.getByText('Welcome to Melrose Rock Creamery!')).toBeInTheDocument()
  })

  it('2. shows the text "Welcome to Melrose Rock Creamery!" on the popup', () => {
    expect(screen.getByText('Welcome to Melrose Rock Creamery!')).toBeInTheDocument()
  })

  it('3. shows the text "Please sign up for our newsletter." on the popup', () => {
    expect(screen.getByText('Please sign up for our newsletter.')).toBeInTheDocument()
  })

  it('4. shows a button with text "Sign Up" on the popup', () => {
    const signUpButton = screen.getByRole('button', { name: /sign up/i })
    expect(signUpButton).toBeInTheDocument()
  })

  it('5. after pressing "Sign Up" with empty form, shows "Please enter your name."', async () => {
    const signUpButton = screen.getByRole('button', { name: /sign up/i })
    const nameInput = screen.getByLabelText(/name/i)

    await userEvent.click(signUpButton)

    // Browser validation sets validationMessage on the invalid input
    expect(nameInput.validationMessage).toBe('Please enter your name.')
  })

  it('6. after entering name and pressing "Sign Up" without email, shows "Please enter your email."', async () => {
    const nameInput = screen.getByLabelText(/name/i)
    const signUpButton = screen.getByRole('button', { name: /sign up/i })

    await userEvent.type(nameInput, 'First Last')
    await userEvent.click(signUpButton)

    const emailInput = screen.getByLabelText(/email/i)
    expect(emailInput.validationMessage).toBe('Please enter your email.')
  })

  it('7. after entering name and email and submitting, shows "Thank you!" on the popup', async () => {
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const signUpButton = screen.getByRole('button', { name: /sign up/i })

    await userEvent.type(nameInput, 'First Last')
    await userEvent.type(emailInput, 'email@example.com')
    await userEvent.click(signUpButton)

    expect(screen.getByText('Thank you!')).toBeInTheDocument()
  })

  it('8. after entering name and email and submitting, shows "You\'ve been added to our newsletter." on the popup', async () => {
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const signUpButton = screen.getByRole('button', { name: /sign up/i })

    await userEvent.type(nameInput, 'First Last')
    await userEvent.type(emailInput, 'email@example.com')
    await userEvent.click(signUpButton)

    expect(screen.getByText("You've been added to our newsletter.")).toBeInTheDocument()
  })
})
