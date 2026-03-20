/**
 * Fetches a recipe by name and author from the API.
 *
 * @param name - Recipe name
 * @param author - Recipe author
 * @param baseUrl - Optional API base URL (default: http://localhost:8080)
 * @returns Recipe or null if not found (HTTP 404)
 */
export async function getRecipe(
  name: string,
  author: string,
  baseUrl: string = 'http://localhost:8080',
): Promise<{ id: number; name: string; author: string; createdDate: string } | null> {
  const params = new URLSearchParams({ name, author });
  const url = `${baseUrl}/recipes/by-name-author?${params}`;

  const response = await fetch(url);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch recipe: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

