import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from '../routeTree.gen'

const FULL_ABOUT_TEXT =
  "Welcome to Melrose Rock Creamery! We are more than a make-believe ice cream shop. We're also your local makerspace, but for frozen treats! You can make and sell your ice cream here in a pop-up format. Or, you can make your recipes for our Super Scoopers to serve to customers. This includes milkshakes, sundaes, floats, and more. Our tasting room is open from 10am - 2pm and 6pm - 11pm every day. To use the purely fictional facilities at Melrose Rock Creamery, you must be a member. We charge a monthly membership fee. See the details of using our kitchen here. We also have rules and qualifications that you must abide by to be a member. Apply now!"

const MEMBERSHIP_PAGE_MARKER = 'With a membership at Melrose Rock Creamery, you will gain access to all of our machines.'

function renderApp() {
  const router = createRouter({ routeTree })
  render(<RouterProvider router={router} />)
  return router
}

async function closePopup() {
  const closeBtn = screen.getByRole('button', { name: /close popup/i })
  await userEvent.click(closeBtn)
}

async function ensureAboutPage() {
  const aboutLink = screen.getByRole('link', { name: 'About' })
  await userEvent.click(aboutLink)
}

function normalizeForCompare(str) {
  return str.replace(/\s/g, '')
}

describe('About tab section at /about', () => {
  beforeEach(async () => {
    renderApp()
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /close popup/i })).toBeInTheDocument()
    })
    await closePopup()
    await ensureAboutPage()
    await waitFor(() => {
      expect(screen.getByText(/We are more than a make-believe ice cream shop/)).toBeInTheDocument()
    })
  })

  it('1. shows the full about text on the page', () => {
    const aboutParagraph = screen.getByText(/We are more than a make-believe ice cream shop/)
    const contentScroll = aboutParagraph.closest('.content-scroll') ?? aboutParagraph.closest('.about')
    expect(contentScroll).toBeTruthy()
    const pageText = normalizeForCompare(contentScroll?.textContent ?? '')
    const expectedText = normalizeForCompare(FULL_ABOUT_TEXT)
    expect(pageText).toContain(expectedText)
  })

  it('2. clicking "here" in the kitchen/membership sentence redirects to /membership', async () => {
    const hereLink = screen.getByRole('link', { name: 'here' })
    expect(hereLink).toHaveAttribute('href', '/membership')
    await userEvent.click(hereLink)
    await waitFor(() => {
      expect(screen.getByText(MEMBERSHIP_PAGE_MARKER)).toBeInTheDocument()
    })
  })
})
