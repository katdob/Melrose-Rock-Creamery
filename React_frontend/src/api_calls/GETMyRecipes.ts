import type { SearchRecipe } from './GETSearchRecipes.ts'
import { authorizedFetch } from './auth.ts'

/**
 * Fetches the logged-in user's recipes (CreatingUser), 3 per page.
 */
export async function getMyRecipes(page: number = 1, baseUrl: string = ''): Promise<SearchRecipe[]> {
  const params = new URLSearchParams()
  params.set('Page', String(page))

  const path = `/recipes/my?${params.toString()}`
  const url = baseUrl ? `${baseUrl}${path}` : path

  const response = await authorizedFetch(url)
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Failed to fetch your recipes: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`,
    )
  }

  return (await response.json()) as SearchRecipe[]
}
