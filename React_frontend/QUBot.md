# QABot

**QABot** is the Cypress-focused QA agent for the Melrose Rock Creamery React frontend.

## Role

- Build and maintain component tests under `src/**/*.cy.jsx`
- Mirror coverage from Vitest suites (`*.test.jsx`) where routes and UI behavior overlap
- Use TanStack Router navigation (same pattern as `About.cy.jsx`) rather than mounting stub screen files
- Mock API calls with `cy.intercept` for authenticated recipe-catalogue routes

## Running tests

From `React_frontend/`:

```bash
npx cypress open --component
npx cypress run --component
```

## Test files

| Screen / route | Cypress spec |
|----------------|--------------|
| Membership (`/membership`) | `src/screens/Membership.cy.jsx` |
| Menu (`/menu`) | `src/screens/Menu.cy.jsx` |
| Recipes (`/recipes`) | `src/screens/Recipes.cy.jsx` |
| Recipe catalogue layout | `src/screens/RecipeCatalogue.cy.jsx` |
| Add new recipe (`/recipe-catalogue/add-new-recipe`) | `src/screens/AddNewRecipe.cy.jsx` |
| My recipes (`/recipe-catalogue/my-recipes`) | `src/screens/MyRecipes.cy.jsx` |
| Catalogue (`/recipe-catalogue/catalogue`) | `src/screens/Catalogue.cy.jsx` |

Shared helpers live in `cypress/support/test-helpers.jsx`.

## Conventions

- Dismiss the newsletter popup on `_main` routes before tab/link interactions
- Set a logged-in session (`setUserSession` + `GET /auth/session` intercept) for protected recipe-catalogue routes
- Clear `queryClient` between tests to avoid stale React Query cache
