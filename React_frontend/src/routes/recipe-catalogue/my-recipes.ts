import React from 'react'
import { createFileRoute } from '@tanstack/react-router'

function MyRecipes(): React.ReactElement {
  return React.createElement(
    'div',
    { className: 'content-scroll' },
    React.createElement('h2', null, 'My Recipes'),
    React.createElement('p', null, 'Your saved recipes will appear here.'),
  )
}

export const Route = createFileRoute('/recipe-catalogue/my-recipes')({
  component: MyRecipes,
})

