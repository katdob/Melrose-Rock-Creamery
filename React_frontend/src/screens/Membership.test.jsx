import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from '../routeTree.gen'

const FULL_MEMBERSHIP_TEXT =
  'With a membership at Melrose Rock Creamery, you will gain access to all of our machines. Before using any of the machines, you will need to be trained. Training is included in your membership. Your membership also includes access to our expert team who will help you if you need more information. Please schedule your training here. Our online catalogue includes the manuals for all the machines in our kitchen. You can use our search feature to search our entire catalogue for any answers you may need. To use our kitchen, you will need to schedule time. Please include 15 minutes at the end of each timeslot to clean up. You must leave the kitchen clean and ready for the next member. You can find the schedule here. Your membership can optionally include access to a storage unit. You can use our hand trucks to take your equipment to and from this storage unit. At Melrose Rock Creamery, we want you to be able to make anything you dream of. To help you with this, your membership includes access to a catalogue of recipes from our community. Many recipes are available, along with comments'

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

async function ensureMembershipPage() {
  const membershipLink = screen.getByRole('link', { name: 'Membership' })
  await userEvent.click(membershipLink)
}

function normalizeForCompare(str) {
  return str.replace(/\s/g, '')
}

describe('Membership tab section at /membership', () => {
  beforeEach(async () => {
    renderApp()
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /close popup/i })).toBeInTheDocument()
    })
    await closePopup()
    await ensureMembershipPage()
    await waitFor(() => {
      expect(screen.getByText(/With a membership at Melrose Rock Creamery/)).toBeInTheDocument()
    })
  })

  it('1. shows the full membership text on the page', () => {
    const membershipParagraph = screen.getByText(/With a membership at Melrose Rock Creamery/)
    const contentScroll = membershipParagraph.closest('.content-scroll') ?? membershipParagraph.closest('.about')
    expect(contentScroll).toBeTruthy()
    const pageText = normalizeForCompare(contentScroll?.textContent ?? '')
    const expectedText = normalizeForCompare(FULL_MEMBERSHIP_TEXT)
    expect(pageText).toContain(expectedText)
  })

  it('2. clicking "catalogue of recipes" opens in a new tab', async () => {
    const catalogueLink = screen.getByRole('link', { name: 'catalogue of recipes' })
    const paragraph = catalogueLink.closest('p')
    expect(paragraph).toBeInTheDocument()
    expect(paragraph).toHaveTextContent('At Melrose Rock Creamery, we want you to be able to make anything you dream of')
    expect(paragraph).toHaveTextContent('catalogue of recipes')
    expect(paragraph).toHaveTextContent('from people who have made that recipe before')
    expect(catalogueLink).toHaveAttribute('href', '/recipe-catalogue')
    expect(catalogueLink).toHaveAttribute('target', '_blank')
    expect(catalogueLink).toHaveAttribute('rel', 'noopener noreferrer')
    await userEvent.click(catalogueLink)
  })
})
