import React from 'react'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from '../../src/routeTree.gen'
import { queryClient } from '../../src/query/queryClient.ts'
import { clearUserSession, setUserSession } from '../../src/query/userSession.ts'

export const LOGGED_IN_USER = {
  firstName: 'Cypress',
  lastName: 'Tester',
  email: 'cypress@example.com',
  isLoggedIn: true,
}

export function resetQueryState() {
  queryClient.clear()
  clearUserSession()
}

export function mountAppRouter() {
  const router = createRouter({ routeTree })
  cy.mount(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )
  return router
}

export function navigateTo(router, path) {
  return cy.wrap(null).then(() => router.navigate({ to: path }))
}

export function dismissNewsletterPopup() {
  cy.get('button.popup-close', { timeout: 10000 }).click({ force: true })
}

export function stubLoggedInSession() {
  setUserSession(LOGGED_IN_USER)
  cy.intercept('GET', '**/auth/session', {
    statusCode: 200,
    body: { user: LOGGED_IN_USER },
  }).as('authSession')
}
