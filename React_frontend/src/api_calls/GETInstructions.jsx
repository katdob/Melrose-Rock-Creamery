/**
 * Fetches all instructions for a recipe from the API.
 * @param {number} recipeId - Recipe ID
 * @param {string} [baseUrl] - Optional API base URL (default: http://localhost:8080)
 * @returns {Promise<Array<{ order: number, instruction: string }> | null>} Instructions array or null if recipe not found
 */
export async function getInstructions(recipeId, baseUrl = 'http://localhost:8080') {
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
