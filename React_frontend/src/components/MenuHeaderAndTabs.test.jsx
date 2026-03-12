import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from '../routeTree.gen'

/**
 * Renders the app at /menu so the main layout header and tabs are visible.
 */
async function renderMenuPage() {
  const router = createRouter({ routeTree })
  render(<RouterProvider router={router} />)
  await act(async () => {
    await router.navigate({ to: '/menu' })
  })
  return router
}

describe('Header and tabs when /menu page renders', () => {
  beforeEach(async () => {
    await renderMenuPage()
  })

  it('1. shows the text "Melrose Rock Creamery" in the header', () => {
    expect(screen.getByRole('heading', { name: 'Melrose Rock Creamery', level: 1 })).toBeInTheDocument()
  })

  it('2. shows the ice-cream.svg image in the header', () => {
    const img = screen.getByRole('img', { name: 'Ice Cream' })
    expect(img).toBeInTheDocument()
    expect(img.src).toContain('ice-cream')
  })

  it('3. shows "Menu" as a tab', () => {
    expect(screen.getByRole('link', { name: 'Menu' })).toBeInTheDocument()
  })

  it('4. shows "Recipes" as a tab', () => {
    expect(screen.getByRole('link', { name: 'Recipes' })).toBeInTheDocument()
  })

  it('5. shows "About" as a tab', () => {
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
  })

  it('6. shows "Membership" as a tab', () => {
    expect(screen.getByRole('link', { name: 'Membership' })).toBeInTheDocument()
  })

  it('7. has a favicon link pointing to favicon.svg', () => {
    const favicon = document.querySelector('link[rel="icon"]')
    expect(favicon).not.toBeNull()
    expect(favicon.getAttribute('href')).toContain('favicon.svg')
  })
})
