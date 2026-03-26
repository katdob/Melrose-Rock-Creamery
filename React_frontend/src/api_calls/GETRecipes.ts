import type { SearchRecipe } from './GETSearchRecipes.ts'

/**
 * Fetches paged catalogue recipes from the API.
 *
 * @param page - 1-based page number
 * @param baseUrl - Optional API base URL (default: same-origin via nginx)
 */
export async function getRecipes(
  page: number = 1,
  baseUrl: string = '',
): Promise<SearchRecipe[]> {
  const params = new URLSearchParams()
  params.set('Page', String(page))

  const path = `/recipes?${params.toString()}`
  const url = baseUrl ? `${baseUrl}${path}` : path

  const response = await fetch(url)
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Failed to fetch recipes: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`,
    )
  }

  return (await response.json()) as SearchRecipe[]
}

