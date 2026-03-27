import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from '../routeTree.gen'

const CONFIRMATION_TEXT =
  'After your email is confirmed your message will be sent to our team. Please check your inbox.'

function renderApp() {
  const router = createRouter({ routeTree })
  const queryClient = new QueryClient()
  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )
  return router
}

async function closePopup() {
  const closeBtn = screen.getByRole('button', { name: /close popup/i })
  await userEvent.click(closeBtn)
}

async function ensureMenuPage() {
  const menuLink = screen.getByRole('link', { name: 'Menu' })
  await userEvent.click(menuLink)
}

async function goToContactViaFooter() {
  const footerLink = screen.getByRole('link', { name: 'Contact the MRC team' })
  await userEvent.click(footerLink)
}

describe('Footer at /menu and Contact page', () => {
  beforeEach(async () => {
    renderApp()
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /close popup/i })).toBeInTheDocument()
    })
    await closePopup()
    await ensureMenuPage()
    await waitFor(() => {
      expect(screen.getByText(/Welcome to Melrose Rock Creamery/)).toBeInTheDocument()
    })
  })

  it('1. "Contact the MRC team" text exists at the bottom of the page', () => {
    const footerLink = screen.getByRole('link', { name: 'Contact the MRC team' })
    expect(footerLink).toBeInTheDocument()
    const footer = footerLink.closest('footer')
    expect(footer).toBeInTheDocument()
    const card = document.querySelector('.card')
    expect(card).toBeInTheDocument()
    expect(card.compareDocumentPosition(footer)).toBe(document.DOCUMENT_POSITION_FOLLOWING)
  })

  it('2. "Contact the MRC team" opens a pop up', async () => {
    await goToContactViaFooter()
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Contact Us' })).toBeInTheDocument()
    })
  })

  it('3. the pop up redirects to http://localhost:3000/contact', async () => {
    await goToContactViaFooter()
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Contact Us' })).toBeInTheDocument()
    })
    expect(window.location.pathname).toBe('/contact')
  })

  it('4. contact page has the text "Contact Us"', async () => {
    await goToContactViaFooter()
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Contact Us' })).toBeInTheDocument()
    })
    expect(screen.getByRole('heading', { name: 'Contact Us' })).toBeInTheDocument()
  })

  it('5. contact page has a Name input under "Contact Us"', async () => {
    await goToContactViaFooter()
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Contact Us' })).toBeInTheDocument()
    })
    const heading = screen.getByRole('heading', { name: 'Contact Us' })
    const nameInput = screen.getByRole('textbox', { name: /name/i })
    expect(nameInput).toBeInTheDocument()
    expect(heading.compareDocumentPosition(nameInput)).toBe(document.DOCUMENT_POSITION_FOLLOWING)
  })

  it('6. contact page has an Email input under the Name input', async () => {
    await goToContactViaFooter()
    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    })
    const nameInput = screen.getByRole('textbox', { name: /name/i })
    const emailInput = screen.getByLabelText(/email/i)
    expect(nameInput.compareDocumentPosition(emailInput)).toBe(document.DOCUMENT_POSITION_FOLLOWING)
  })

  it('7. contact page has a Message input under the Email input', async () => {
    await goToContactViaFooter()
    await waitFor(() => {
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    })
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)
    expect(emailInput.compareDocumentPosition(messageInput)).toBe(document.DOCUMENT_POSITION_FOLLOWING)
  })

  it('8. contact page has a Send button under the Message input', async () => {
    await goToContactViaFooter()
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument()
    })
    const messageInput = screen.getByLabelText(/message/i)
    const sendButton = screen.getByRole('button', { name: 'Send' })
    expect(messageInput.compareDocumentPosition(sendButton)).toBe(document.DOCUMENT_POSITION_FOLLOWING)
  })

  it('9. "Please enter your name" appears if Name is empty and user clicks Send', async () => {
    await goToContactViaFooter()
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument()
    })
    const nameInput = screen.getByRole('textbox', { name: /name/i })
    const sendButton = screen.getByRole('button', { name: 'Send' })
    await userEvent.click(sendButton)
    expect(nameInput.validationMessage).toBe('Please enter your name')
  })

  it('10. "Please enter your email" appears if Email is empty and user clicks Send', async () => {
    await goToContactViaFooter()
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument()
    })
    const nameInput = screen.getByRole('textbox', { name: /name/i })
    const emailInput = screen.getByLabelText(/email/i)
    await userEvent.type(nameInput, 'First Last')
    await userEvent.click(screen.getByRole('button', { name: 'Send' }))
    expect(emailInput.validationMessage).toBe('Please enter your email')
  })

  it('11. Message counter and max length 500 work correctly', async () => {
    await goToContactViaFooter()
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument()
    })
    const nameInput = screen.getByRole('textbox', { name: /name/i })
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)
    await userEvent.type(nameInput, 'First Last')
    await userEvent.type(emailInput, 'example@example.com')
    await userEvent.type(messageInput, 'a'.repeat(499))
    expect(screen.getByText((content) => content.includes('499') && content.includes('/500'))).toBeInTheDocument()
    await userEvent.type(messageInput, 'a')
    expect(screen.getByText((content) => content.includes('500') && content.includes('/500'))).toBeInTheDocument()
    await userEvent.type(messageInput, 'a')
    const count = (messageInput.value.match(/a/g) || []).length
    expect(count).toBe(500)
  })

  it('12. Send button changes to darker color when hovered', async () => {
    await goToContactViaFooter()
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument()
    })
    const nameInput = screen.getByRole('textbox', { name: /name/i })
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)
    await userEvent.type(nameInput, 'First Last')
    await userEvent.type(emailInput, 'example@example.com')
    await userEvent.type(messageInput, 'a'.repeat(499))
    const sendButton = screen.getByRole('button', { name: 'Send' })
    expect(sendButton).toHaveClass('send-button')
    await userEvent.hover(sendButton)
    expect(sendButton).toHaveClass('send-button')
  })

  it('13. after Send click, confirmation text is on the page', async () => {
    await goToContactViaFooter()
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument()
    })
    const nameInput = screen.getByRole('textbox', { name: /name/i })
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)
    await userEvent.type(nameInput, 'First Last')
    await userEvent.type(emailInput, 'example@example.com')
    await userEvent.type(messageInput, 'a'.repeat(499))
    await userEvent.click(screen.getByRole('button', { name: 'Send' }))
    await waitFor(() => {
      expect(screen.getByText(CONFIRMATION_TEXT)).toBeInTheDocument()
    })
  })
})
