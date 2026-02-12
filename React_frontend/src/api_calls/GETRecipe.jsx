/**
 * Fetches a recipe by name and author from the API.
 * @param {string} name - Recipe name
 * @param {string} author - Recipe author
 * @param {string} [baseUrl] - Optional API base URL (default: http://localhost:8080)
 * @returns {Promise<{ id: number, name: string, author: string, createdDate: string } | null>} Recipe or null if not found
 */
export async function getRecipe(name, author, baseUrl = 'http://localhost:8080') {
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
