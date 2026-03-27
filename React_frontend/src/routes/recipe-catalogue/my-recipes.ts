import React from 'react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { requireUserSession } from '../../auth/requireUserSession.ts'
import { requestLoginPopup } from '../../auth/loginPopupRequest.ts'

function MyRecipes(): React.ReactElement {
  return React.createElement(
    'div',
    { className: 'content-scroll' },
    React.createElement('h2', null, 'My Recipes'),
    React.createElement('p', null, 'Your saved recipes will appear here.'),
  )
}

export const Route = createFileRoute('/recipe-catalogue/my-recipes')({
  beforeLoad: async () => {
    const isAllowed = await requireUserSession()
    if (!isAllowed) {
      requestLoginPopup()
      throw redirect({ to: '/menu' })
    }
  },
  component: MyRecipes,
})

