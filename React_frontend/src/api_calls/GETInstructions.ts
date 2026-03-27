import { authorizedFetch } from './auth.ts'

/**
 * Fetches all instructions for a recipe from the API.
 *
 * @param recipeId - Recipe ID
 * @param baseUrl - Optional API base URL (default: same-origin via nginx)
 * @returns Instructions array or null if recipe not found (HTTP 404)
 */
export async function getInstructions(
  recipeId: number,
  baseUrl: string = '',
): Promise<Array<{ order: number; instruction: string }> | null> {
  const url = baseUrl ? `${baseUrl}/recipes/${recipeId}/instructions` : `/recipes/${recipeId}/instructions`;

  const response = await authorizedFetch(url);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch instructions: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

