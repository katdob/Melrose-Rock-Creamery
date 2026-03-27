import { authorizedFetch } from './auth.ts'

/**
 * Fetches a recipe by name and author from the API.
 *
 * @param name - Recipe name
 * @param author - Recipe author
 * @param baseUrl - Optional API base URL (default: same-origin via nginx)
 * @returns Recipe or null if not found (HTTP 404)
 */
export async function getRecipe(
  name: string,
  author: string,
  baseUrl: string = '',
): Promise<{ id: number; name: string; author: string; createdDate: string } | null> {
  const params = new URLSearchParams({ name, author });
  const url = baseUrl
    ? `${baseUrl}/recipes/by-name-author?${params}`
    : `/recipes/by-name-author?${params}`;

  const response = await authorizedFetch(url);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch recipe: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

