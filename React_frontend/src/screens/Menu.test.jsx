import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, act, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from '../routeTree.gen'

const WELCOME_TEXT =
  'Welcome to Melrose Rock Creamery! Our tasting room is open from 10am - 2pm and 6pm - 11pm every day.'

const MENU_FLAVORS = [
  { name: 'Simple Vanilla Ice Cream', ingredients: ['whole milk', 'granulated sugar', 'salt flakes', 'heavy cream', 'pure vanilla extract'] },
  { name: 'Simple Chocolate Ice Cream', ingredients: ['cocoa powder', 'granulated sugar', 'dark brown sugar', 'salt flakes', 'whole milk', 'heavy cream', 'pure vanilla extract'] },
  { name: 'Butter Pecan Ice Cream', ingredients: ['unsalted butter', 'pecans', 'salt flakes', 'whole milk', 'granulated sugar', 'heavy cream', 'pure vanilla extract'] },
  { name: 'Fresh Strawberry Ice Cream', ingredients: ['fresh ripe strawberries', 'whole milk', 'granulated sugar', 'salt flakes', 'heavy cream', 'pure vanilla extract'] },
  { name: "Peanut Butter Cup Ice Cream", ingredients: ["peanut butter", "granulated sugar", "whole milk", "heavy cream", "pure vanilla extract", "Reese's Peanut Butter Cups"] },
  { name: "S'mores Ice Cream", ingredients: ['cocoa powder', 'granulated sugar', 'dark brown sugar', 'salt flakes', 'whole milk', 'heavy cream', 'pure vanilla extract', 'mini marshmallows', 'digestive biscuits', 'chocolate chips'] },
  { name: 'Banana Walnut Chip Ice Cream', ingredients: ['heavy cream', 'whole milk', 'pure vanilla extract', 'salt flakes', 'dark brown sugar', 'water', 'unsalted butter', 'bananas', 'dark rum', 'fresh lemon juice', 'bittersweet chocolate chips', 'toasted walnuts'] },
  { name: 'Vanilla Bean Ice Cream', ingredients: ['whole milk', 'heavy cream', 'granulated sugar', 'salt flakes', 'vanilla bean', 'egg yolks', 'pure vanilla extract'] },
  { name: 'Fresh Mint and Chocolate Cookies Ice Cream', ingredients: ['whole milk', 'heavy cream', 'granulated sugar', 'salt flakes', 'pure vanilla extract', 'fresh mint leaves', 'egg yolks', 'chocolate sandwich cookies'] },
  { name: 'Mexican-Style Chocolate Ice Cream', ingredients: ['whole milk', 'heavy cream', 'granulated sugar', 'pure vanilla extract', 'ground cinnamon', 'cayenne', 'salt flakes', 'egg yolks', 'bittersweet chocolate'] },
  { name: 'Salted Caramel Ice Cream', ingredients: ['whole milk', 'heavy cream', 'granulated sugar', 'salt flakes', 'pure vanilla extract', 'egg yolks', 'water', 'unsalted butter', 'flaked sea salt'] },
  { name: 'Dark Chocolate Sorbet', ingredients: ['water', 'granulated sugar', 'salt flakes', 'cocoa powder', 'pure vanilla extract'] },
  { name: 'Grapefruit and Prosecco Sorbet', ingredients: ['water', 'granulated sugar', 'grapefruit zest', 'salt flakes', 'fresh grapefruit juice', 'Prosecco'] },
  { name: 'Dairy-Free Vanilla Ice Cream', ingredients: ['dairy-free milk', 'tapioca flour', 'granulated sugar', 'salt flakes', 'pure vanilla extract'] },
  { name: 'Coconut-Chocolate Ice Cream', ingredients: ['cocoa powder', 'granulated sugar', 'light brown sugar', 'salt flakes', 'coconut milk', 'pure vanilla extract'] },
  { name: 'Rich Vanilla Frozen Yogurt', ingredients: ['water', 'honey', 'vanilla beans', 'whole-milk Greek yogurt', 'pure vanilla extract', 'granulated sugar', 'salt flakes'] },
  { name: 'Mango Frozen Yogurt', ingredients: ['whole-milk plain Greek yogurt', 'granulated sugar', 'salt flakes', 'mango pieces', 'fresh lime juice'] },
  { name: 'Chocolate-Pretzel Frozen Yogurt', ingredients: ['whole-milk plain Greek yogurt', 'milk', 'granulated sugar', 'cocoa powder', 'salt flakes', 'pure vanilla extract', 'chocolate-covered pretzels'] },
  { name: 'Chocolate-Hazelnut Gelato', ingredients: ['heavy cream', 'whole milk', 'granulated sugar', 'cornstarch', 'salt flakes', 'chocolate-hazelnut spread', 'hazelnuts'] },
  { name: 'Espresso Gelato', ingredients: ['whole milk', 'heavy cream', 'brewed espresso', 'granulated sugar', 'cornstarch', 'salt flakes', 'liquid pectin'] },
  { name: 'Custard Gelato', ingredients: ['whole milk', 'heavy cream', 'pure vanilla extract', 'salt flakes', 'cornstarch', 'egg yolks', 'granulated sugar'] },
]

async function renderMenuPage() {
  const router = createRouter({ routeTree })
  render(<RouterProvider router={router} />)
  await act(async () => {
    await router.navigate({ to: '/menu' })
  })
  return router
}

function closePopup() {
  const closeBtn = screen.getByRole('button', { name: /close popup/i })
  return userEvent.click(closeBtn)
}

async function assertRecipeTooltipIngredients(recipeName, ingredients) {
  const menuScroll = document.querySelector('.menu-scroll')
  expect(menuScroll).toBeInTheDocument()
  const menuList = menuScroll.querySelector('ul.menu-list')
  expect(menuList).toBeInTheDocument()
  const listItems = menuList.querySelectorAll('li')
  const item = Array.from(listItems).find((li) => li.textContent?.includes(recipeName))
  expect(item).toBeDefined()
  const icon = within(item).getByText(/ℹ️/)
  const tooltip = item.querySelector('.ingredient-tooltip')
  expect(tooltip).toBeInTheDocument()
  await userEvent.hover(icon)
  const assertAllInTooltip = () => {
    for (const ing of ingredients) {
      expect(within(tooltip).getByText(ing)).toBeInTheDocument()
    }
  }
  assertAllInTooltip()
  if (menuScroll && typeof menuScroll.scrollTo === 'function') {
    menuScroll.scrollTo(0, 0)
    await userEvent.hover(icon)
    assertAllInTooltip()
  }
}

describe('Menu tab section at /menu', () => {
  beforeEach(async () => {
    await renderMenuPage()
    await closePopup()
  })

  it('1. shows the welcome and hours text on the page', () => {
    expect(screen.getByText(WELCOME_TEXT)).toBeInTheDocument()
  })

  it('2. shows the text "Available Flavors" on the page', () => {
    expect(screen.getByRole('heading', { name: 'Available Flavors', level: 2 })).toBeInTheDocument()
  })

  it('3. shows the recipe title "Simple Vanilla Ice Cream" on the page', () => {
    expect(screen.getByText('Simple Vanilla Ice Cream')).toBeInTheDocument()
  })

  it('4. shows all ingredients in the tooltip for Simple Vanilla Ice Cream, scrolling if needed', async () => {
    await assertRecipeTooltipIngredients(MENU_FLAVORS[0].name, MENU_FLAVORS[0].ingredients)
  })

  // Tests 6–45: recipe title + ingredients tooltip for each remaining flavor
  MENU_FLAVORS.slice(1).forEach((flavor, index) => {
    const testNum = 6 + index * 2
    it(`${testNum}. shows the recipe title "${flavor.name}" on the page`, () => {
      expect(screen.getByText(flavor.name)).toBeInTheDocument()
    })
    it(`${testNum + 1}. shows all ingredients in the tooltip for "${flavor.name}", scrolling if needed`, async () => {
      await assertRecipeTooltipIngredients(flavor.name, flavor.ingredients)
    })
  })
})
