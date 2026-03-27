import React, { useState } from 'react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { requireUserSession } from '../../auth/requireUserSession.ts'
import { requestLoginPopup } from '../../auth/loginPopupRequest.ts'
import { getMyRecipes } from '../../api_calls/GETMyRecipes.ts'

function MyRecipes(): React.ReactElement {
  const pageSize = 3
  const [currentPage, setCurrentPage] = useState(1)

  const {
    data: recipes = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['my-recipes', currentPage],
    queryFn: () => getMyRecipes(currentPage),
  })

  const hasNextPage = recipes.length === pageSize

  return React.createElement(
    'div',
    { className: 'content-scroll', style: { width: '40rem', height: 'auto', marginTop: '-5rem' } },
    React.createElement('h2', null, 'My Recipes'),
    isLoading
      ? React.createElement('p', { style: { color: 'var(--dark-dusty-rose)' } }, 'Loading your recipes…')
      : null,
    isError
      ? React.createElement(
          'p',
          { className: 'add-recipe-error', role: 'alert' },
          error instanceof Error ? error.message : 'Could not load recipes.',
        )
      : null,
    !isLoading &&
      !isError &&
      recipes.length === 0 &&
      React.createElement('p', null, 'You have not created any recipes yet.'),
    !isLoading &&
      !isError &&
      recipes.length > 0 &&
      React.createElement(
        'div',
        { style: { marginTop: '0.75rem' } },
        recipes.map((r) =>
          React.createElement(
            'div',
            { key: r.id, style: { marginBottom: '1rem', padding: '0.5rem 0' } },
            React.createElement('strong', null, r.name),
            React.createElement('div', { style: { fontSize: '0.9rem', color: 'var(--dark-dusty-rose)' } }, `by ${r.author}`),
            React.createElement(
              'ul',
              { className: 'ingredients-list', style: { marginTop: '0.5rem', textAlign: 'left' } },
              (r.ingredients ?? []).map((ing) =>
                React.createElement(
                  'li',
                  { key: ing.id },
                  `${ing.amount ?? ''}${ing.amount != null && ing.unit ? ' ' : ''}${ing.unit ?? ''}${
                    ing.amount != null || ing.unit ? ' ' : ''
                  }${ing.name ?? ''}`,
                ),
              ),
            ),
            React.createElement(
              'ol',
              { className: 'instructions-list', style: { textAlign: 'left', marginTop: '0.5rem' } },
              [...(r.instructions ?? [])]
                .sort((a, b) => a.order - b.order)
                .map((inst) => React.createElement('li', { key: inst.id }, inst.text ?? '')),
            ),
          ),
        ),
        React.createElement(
          'div',
          {
            style: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '0.75rem',
            },
          },
          React.createElement(
            'button',
            {
              type: 'button',
              className: 'add-ingredient-btn',
              disabled: isLoading || currentPage <= 1,
              onClick: () => {
                if (currentPage > 1) setCurrentPage((p) => p - 1)
              },
            },
            'Previous',
          ),
          React.createElement(
            'button',
            {
              type: 'button',
              className: 'add-ingredient-btn',
              disabled: true,
              style: { minWidth: '2.4rem', opacity: 0.9 },
            },
            String(currentPage),
          ),
          React.createElement(
            'button',
            {
              type: 'button',
              className: 'add-ingredient-btn',
              disabled: isLoading || !hasNextPage,
              onClick: () => {
                if (hasNextPage) setCurrentPage((p) => p + 1)
              },
            },
            'Next',
          ),
        ),
      ),
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

