import React from 'react'
import { createFileRoute } from '@tanstack/react-router'

function Catalogue(): React.ReactElement {
  return React.createElement(
    'div',
    { className: 'content-scroll' },
    React.createElement('h2', null, 'Catalogue'),
    React.createElement('p', null, 'Browse our community recipe catalogue.'),
  )
}

export const Route = createFileRoute('/recipe-catalogue/catalogue')({
  component: Catalogue,
})

