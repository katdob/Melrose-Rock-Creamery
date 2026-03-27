import React, { useState } from 'react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getSearchRecipes, type SearchRecipe } from '../../api_calls/GETSearchRecipes.ts'
import { getRecipes } from '../../api_calls/GETRecipes.ts'
import { requireUserSession } from '../../auth/requireUserSession.ts'
import { requestLoginPopup } from '../../auth/loginPopupRequest.ts'

function Catalogue(): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [activeSearchTerm, setActiveSearchTerm] = useState('')

  const pageSize = 3
  const trimmedActiveTerm = activeSearchTerm.trim()

  const {
    data: searchResults = [],
    isLoading: searching,
  } = useQuery({
    queryKey: ['catalogue-recipes', trimmedActiveTerm, currentPage],
    queryFn: async (): Promise<SearchRecipe[]> => {
      if (trimmedActiveTerm) {
        const data = await getSearchRecipes(trimmedActiveTerm, currentPage)
        return data?.results ?? []
      }

      const data = await getRecipes(currentPage)
      return data ?? []
    },
  })

  const downloadRecipeAsPdf = (recipe: SearchRecipe) => {
    const instructions = [...(recipe.instructions ?? [])]
      .sort((a, b) => a.order - b.order)
      .map((instruction) => `<li>${instruction.text ?? ''}</li>`)
      .join('')

    const ingredients = (recipe.ingredients ?? [])
      .map((ing) => {
        const amount = ing.amount ?? ''
        const unit = ing.unit ?? ''
        const spacing = ing.amount != null && ing.unit ? ' ' : ''
        const suffix = ing.amount != null || ing.unit ? ' ' : ''
        return `<li>${amount}${spacing}${unit}${suffix}${ing.name ?? 'Unknown ingredient'}</li>`
      })
      .join('')

    const html = `
      <html>
        <head>
          <title>${recipe.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; color: #333; }
            h1, h2 { margin-bottom: 8px; }
            ul, ol { margin-top: 8px; margin-bottom: 16px; }
          </style>
        </head>
        <body>
          <h1>${recipe.name}</h1>
          <p><strong>Author:</strong> ${recipe.author}</p>
          <h2>Ingredients</h2>
          <ul>${ingredients}</ul>
          <h2>Instructions</h2>
          <ol>${instructions}</ol>
        </body>
      </html>`

    const printWindow = window.open('', '_blank', 'width=900,height=700')
    if (!printWindow) return

    printWindow.document.open()
    printWindow.document.write(html)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
  }

  const handleSearch = () => {
    const q = (searchQuery ?? '').trim()
    if (!q) {
      setActiveSearchTerm('')
      setCurrentPage(1)
      return
    }

    setActiveSearchTerm(q)
    setCurrentPage(1)
  }

  const hasNextPage = searchResults.length === pageSize

  return React.createElement(
    'div',
    { className: 'content-scroll', style: { width: '40rem', height: 'auto', marginTop: '-5rem' } },
    React.createElement('h3', null, 'Search for a Recipe!'),
    React.createElement(
      'form',
      {
        className: 'recipe-catalogue-search-form',
        onSubmit: (e: React.FormEvent) => {
          e.preventDefault()
          void handleSearch()
        },
      },
      React.createElement('input', {
        type: 'text',
        className: 'recipe-name-input catalogue-search-input recipe-catalogue-search-input',
        placeholder: 'Search for recipes by name, author, or ingredient.',
        value: searchQuery,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value),
      }),
      React.createElement(
        'button',
        {
          type: 'submit',
          className: 'add-ingredient-btn recipe-catalogue-search-btn',
          disabled: searching,
        },
        'search',
      ),
    ),
    searching &&
      React.createElement(
        'div',
        { style: { marginTop: '0.75rem', color: 'var(--dark-dusty-rose)' } },
        'Searching...',
      ),
    !searching &&
      searchResults.length > 0 &&
      React.createElement(
        'div',
        { style: { marginTop: '0.75rem' } },
        searchResults.map((r, idx) =>
          React.createElement(
            React.Fragment,
            { key: r.id },
            React.createElement(
              'div',
              {
                style: {
                  display: 'flex',
                  alignItems: 'flex-start',
                  padding: '0.35rem 0.5rem',
                },
              },
              React.createElement(
                'div',
                { style: { flex: 1 } },
                React.createElement(
                  'div',
                  { style: { textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' } },
                  React.createElement('strong', null, r.name),
                  React.createElement('span', null, `by ${r.author}`),
                  React.createElement(
                    'span',
                    { style: { position: 'relative', display: 'inline-block' } },
                    React.createElement(
                      'button',
                      {
                        type: 'button',
                        'aria-label': 'Download options',
                        title: 'Download recipe as PDF',
                        onClick: () => downloadRecipeAsPdf(r),
                        style: {
                          width: '1.2rem',
                          height: '1.2rem',
                          borderRadius: '999px',
                          border: '2px solid var(--mild-hot-pink)',
                          backgroundColor: 'transparent',
                          fontWeight: 700,
                          cursor: 'pointer',
                          lineHeight: 1,
                          padding: 0,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        },
                      },
                      React.createElement('img', {
                        src: '/favicon.svg',
                        alt: 'Download recipe',
                        style: { width: '0.8rem', height: '0.8rem', display: 'block', margin: '0 auto' },
                      }),
                    ),
                  ),
                ),
                React.createElement(
                  'ul',
                  {
                    className: 'ingredients-list',
                    style: { textAlign: 'left', marginTop: '0.5rem', marginBottom: '0.5rem' },
                  },
                  (r.ingredients ?? []).map((ing) =>
                    React.createElement(
                      'li',
                      { key: ing.id },
                      React.createElement('input', {
                        type: 'checkbox',
                        style: { marginRight: '0.5rem' },
                      }),
                      `${ing.amount ?? ''}${ing.amount != null && ing.unit ? ' ' : ''}${ing.unit ?? ''}${
                        ing.amount != null || ing.unit ? ' ' : ''
                      }${ing.name ?? 'Unknown ingredient'}`,
                    ),
                  ),
                ),
                React.createElement(
                  'div',
                  { style: { display: 'flex', justifyContent: 'center', margin: '0.5rem 0' } },
                  React.createElement('hr', {
                    style: {
                      width: '50%',
                      border: 0,
                      borderTop: '2px solid var(--plush-light-medium-pink)',
                      margin: 0,
                    },
                  }),
                ),
                React.createElement(
                  'ol',
                  {
                    className: 'instructions-list',
                    style: { textAlign: 'left', marginTop: '0.5rem', marginBottom: '0.75rem' },
                  },
                  [...(r.instructions ?? [])]
                    .sort((a, b) => a.order - b.order)
                    .map((instruction) =>
                      React.createElement('li', { key: instruction.id }, instruction.text ?? ''),
                    ),
                ),
              ),
            ),
            idx < searchResults.length - 1 ? React.createElement('hr', { className: 'recipe-separator' }) : null,
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
              disabled: searching || currentPage <= 1,
              onClick: () => {
                if (currentPage > 1) setCurrentPage((p) => p - 1)
              },
            },
            'Previous',
          ),
          currentPage > 1
            ? React.createElement(
                'button',
                {
                  type: 'button',
                  className: 'add-ingredient-btn',
                  disabled: searching,
                  onClick: () => setCurrentPage((p) => p - 1),
                  style: { minWidth: '2.4rem' },
                },
                String(currentPage - 1),
              )
            : null,
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
          hasNextPage
            ? React.createElement(
                'button',
                {
                  type: 'button',
                  className: 'add-ingredient-btn',
                  disabled: searching,
                  onClick: () => setCurrentPage((p) => p + 1),
                  style: { minWidth: '2.4rem' },
                },
                String(currentPage + 1),
              )
            : null,
          React.createElement(
            'button',
            {
              type: 'button',
              className: 'add-ingredient-btn',
              disabled: searching || !hasNextPage,
              onClick: () => {
                if (hasNextPage) setCurrentPage((p) => p + 1)
              },
            },
            'Next',
          ),
        ),
      ),
    !searching &&
      searchResults.length === 0 &&
      React.createElement(
        'div',
        { style: { marginTop: '0.75rem', color: 'var(--dark-dusty-rose)' } },
        currentPage > 1 ? 'No results on this page.' : activeSearchTerm ? 'No recipes found.' : 'No recipes available.',
      ),
  )
}

export const Route = createFileRoute('/recipe-catalogue/catalogue')({
  beforeLoad: async () => {
    const isAllowed = await requireUserSession()
    if (!isAllowed) {
      requestLoginPopup()
      throw redirect({ to: '/menu' })
    }
  },
  component: Catalogue,
})

