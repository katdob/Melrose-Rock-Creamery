/**
 * Finds recipes by partial match on name, author, or ingredient name.
 *
 * @param search - Search string
 * @param baseUrl - Optional API base URL (default: http://localhost:8080)
 * @returns Matching recipes
 */
export async function postFindRecipe(
  search: string,
  baseUrl: string = 'http://localhost:8080',
): Promise<Array<{ id: number; name: string; author: string; createdDate: string }>> {
  const url = `${baseUrl}/recipes/find`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ Search: search?.trim() ?? '' }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Failed to find recipes: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`,
    )
  }

  return response.json()
}

