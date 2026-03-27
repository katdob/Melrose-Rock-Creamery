import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from '../routeTree.gen'
import * as getRecipeModule from '../api_calls/GETRecipe.ts'
import * as getInstructionsModule from '../api_calls/GETInstructions.ts'

const INTRO_TEXT =
  "Here's a free recipe to get you going! You can do this at home, with whatever 2 quart ice cream maker you like."

const BULLET_1 =
  'Never add mix-ins in the ice cream maker. Instead, add them in one layer at a time when you put the ice cream in the container.'
const BULLET_2 =
  'Smaller additions are better. I prefer mini chocolate chips to full size.'
const BULLET_3 =
  "You don't need a fancy container to get started. A large yogurt container will work just as well, simply put wax paper over the top of the ice cream to prevent freezer burn."

const INSTRUCTION_1 =
  'In a medium bowl, use a hand mixer on low speed or whisk to combine the milk, sugar and salt until the sugar is dissolved. Stir in the heavy cream and vanilla extract. Cover and refrigerate a minimum of 2 hours, preferably overnight. Whisk mixture together again before continuing.'
const INSTRUCTION_2 =
  'Turn on the ice cream maker; pour the mixture into the frozen freezer bowl and let mix until thickened, about 15 to 20 minutes. The ice cream will have a soft, creamy texture. If a firmer consistency is desired, transfer the ice cream to an airtight container and place in freezer for about 2 hours. Remove from freezer about 15 minutes before serving.'

const CUISINART_TEXT =
  'This example is provided by Cuisinart. You can download their free recipe booklet here!'

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

async function ensureRecipesPage() {
  const recipesLink = screen.getByRole('link', { name: 'Recipes' })
  await userEvent.click(recipesLink)
}

describe('Recipes tab section at /recipes', () => {
  beforeEach(async () => {
    renderApp()
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /close popup/i })).toBeInTheDocument()
    })
    await closePopup()
    await ensureRecipesPage()
    await waitFor(() => {
      expect(screen.getByText(INTRO_TEXT)).toBeInTheDocument()
    })
  })

  it('1. shows the intro text on the page', () => {
    expect(screen.getByText(INTRO_TEXT)).toBeInTheDocument()
  })

  it('2. shows the text "Recommendations:" on the page', () => {
    expect(screen.getByText('Recommendations:')).toBeInTheDocument()
  })

  it('3. shows the first recommendation as a bullet point', () => {
    const listItem = screen.getByText(BULLET_1)
    expect(listItem).toBeInTheDocument()
    expect(listItem.tagName).toBe('LI')
  })

  it('4. shows the second recommendation as a bullet point', () => {
    const listItem = screen.getByText(BULLET_2)
    expect(listItem).toBeInTheDocument()
    expect(listItem.tagName).toBe('LI')
  })

  it('5. shows the third recommendation as a bullet point', () => {
    const listItem = screen.getByText(BULLET_3)
    expect(listItem).toBeInTheDocument()
    expect(listItem.tagName).toBe('LI')
  })

  it('6. has element with id "recipe-1" containing "Simple Vanilla Ice Cream"', () => {
    const recipeHeading = document.getElementById('recipe-1')
    expect(recipeHeading).toBeInTheDocument()
    expect(recipeHeading).toHaveTextContent('Simple Vanilla Ice Cream')
  })

  it('7. recipe element id matches Recipe.id from API (recipe-{id})', async () => {
    const mockRecipe = { id: 1, name: 'Simple Vanilla Ice Cream', author: 'Cuisinart', createdDate: '2020-01-01' }
    vi.spyOn(getRecipeModule, 'getRecipe').mockResolvedValue(mockRecipe)
    const recipe = await getRecipeModule.getRecipe('Simple Vanilla Ice Cream', 'Cuisinart')
    expect(recipe).not.toBeNull()
    const recipeEl = document.getElementById(`recipe-${recipe.id}`)
    expect(recipeEl).toBeInTheDocument()
    expect(recipeEl).toHaveTextContent('Simple Vanilla Ice Cream')
    vi.restoreAllMocks()
  })

  it('8. shows "Ingredients" heading below the element with id "recipe-1"', () => {
    const recipeEl = document.getElementById('recipe-1')
    expect(recipeEl).toBeInTheDocument()
    const ingredientsHeading = screen.getByRole('heading', { name: 'Ingredients', level: 3 })
    expect(ingredientsHeading).toBeInTheDocument()
    const compare = document.compareDocumentPosition(ingredientsHeading, recipeEl)
    const nodeFollowing = document.DOCUMENT_POSITION_FOLLOWING
    expect(compare & nodeFollowing).toBe(nodeFollowing)
  })

  it('9. each ingredient from recipe is on the page as a bullet point', async () => {
    const mockRecipe = { id: 1, name: 'Simple Vanilla Ice Cream', author: 'Cuisinart', IngredientsList: [1, 2, 3, 4, 5] }
    vi.spyOn(getRecipeModule, 'getRecipe').mockResolvedValue(mockRecipe)
    const recipe = await getRecipeModule.getRecipe('Simple Vanilla Ice Cream', 'Cuisinart')
    expect(recipe).not.toBeNull()
    const ingredientsList = document.querySelector('ul.ingredients-list')
    expect(ingredientsList).toBeInTheDocument()
    const listItems = ingredientsList.querySelectorAll('li')
    const expectedIngredients = [
      '1 cup whole milk',
      '¾ cup granulated sugar',
      'Pinch salt flakes',
      '2 cups heavy cream',
      '1 tablespoon pure vanilla extract',
    ]
    expect(listItems.length).toBe(expectedIngredients.length)
    expectedIngredients.forEach((text) => {
      const li = Array.from(listItems).find((el) => el.textContent?.trim() === text)
      expect(li).toBeDefined()
      expect(li?.tagName).toBe('LI')
    })
    vi.restoreAllMocks()
  })

  it('10. instructions from API appear in order as numbered list items', async () => {
    const mockInstructions = [
      { order: 1, instruction: INSTRUCTION_1 },
      { order: 2, instruction: INSTRUCTION_2 },
    ]
    vi.spyOn(getInstructionsModule, 'getInstructions').mockResolvedValue(mockInstructions)
    const instructions = await getInstructionsModule.getInstructions(1)
    expect(instructions).toHaveLength(2)
    const ol = document.querySelector('ol.instructions-list')
    expect(ol).toBeInTheDocument()
    const listItems = ol.querySelectorAll('li')
    expect(listItems.length).toBe(2)
    vi.restoreAllMocks()
  })

  it('10.1. first instruction text is in the first bullet point', () => {
    const ol = document.querySelector('ol.instructions-list')
    expect(ol).toBeInTheDocument()
    const firstLi = ol.querySelector('li:first-child')
    expect(firstLi).toHaveTextContent(INSTRUCTION_1)
  })

  it('10.2. second instruction text is in the second bullet point', () => {
    const ol = document.querySelector('ol.instructions-list')
    expect(ol).toBeInTheDocument()
    const items = ol.querySelectorAll('li')
    expect(items.length).toBeGreaterThanOrEqual(2)
    expect(items[1]).toHaveTextContent(INSTRUCTION_2)
  })

  it('11. Cuisinart booklet text is on the page after the instructions', () => {
    const hereLink = screen.getByRole('link', { name: 'here' })
    const cuisinartParagraph = hereLink.closest('p')
    expect(cuisinartParagraph).toBeInTheDocument()
    expect(cuisinartParagraph).toHaveTextContent('This example is provided by Cuisinart')
    expect(cuisinartParagraph).toHaveTextContent('You can download their free recipe booklet')
    expect(cuisinartParagraph).toHaveTextContent('here')
    const ol = document.querySelector('ol.instructions-list')
    expect(ol).toBeInTheDocument()
    expect(ol.compareDocumentPosition(cuisinartParagraph)).toBe(document.DOCUMENT_POSITION_FOLLOWING)
  })

  it('12. "here" link points to a file and clicking it uses that href (download)', async () => {
    const link = screen.getByRole('link', { name: 'here' })
    expect(link).toBeInTheDocument()
    const href = link.getAttribute('href')
    expect(href).toBeTruthy()
    expect(href).toMatch(/\.pdf$/i)
    await userEvent.click(link)
    expect(link.getAttribute('href')).toBe(href)
  })
})
