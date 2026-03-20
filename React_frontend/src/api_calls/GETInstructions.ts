/**
 * Fetches all instructions for a recipe from the API.
 *
 * @param recipeId - Recipe ID
 * @param baseUrl - Optional API base URL (default: http://localhost:8080)
 * @returns Instructions array or null if recipe not found (HTTP 404)
 */
export async function getInstructions(
  recipeId: number,
  baseUrl: string = 'http://localhost:8080',
): Promise<Array<{ order: number; instruction: string }> | null> {
  const url = `${baseUrl}/recipes/${recipeId}/instructions`;

  const response = await fetch(url);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch instructions: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

