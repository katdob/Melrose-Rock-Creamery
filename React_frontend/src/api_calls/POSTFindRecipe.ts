/**
 * Finds recipes by partial match on name, author, or ingredient name.
 *
 * @param search - Search string
 * @param baseUrl - Optional API base URL (default: same-origin via nginx)
 * @returns Matching recipes
 */
export async function postFindRecipe(
  search: string,
  baseUrl: string = '',
): Promise<Array<{ id: number; name: string; author: string; createdDate: string }>> {
  const url = baseUrl ? `${baseUrl}/recipes/find` : `/recipes/find`

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

