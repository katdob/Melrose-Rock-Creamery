import React from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import '../App.css'

function RootLayout(): React.ReactElement {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Outlet, null),
    React.createElement(TanStackRouterDevtools, { position: 'bottom-right' }),
  )
}

export const Route = createRootRoute({
  component: RootLayout,
})

