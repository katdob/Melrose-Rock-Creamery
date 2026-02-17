/**
 * Assigns ingredient IDs to a recipe.
 * @param {number} recipeId - Recipe ID
 * @param {number[]} ingredientIds - Array of ingredient IDs
 * @param {string} [baseUrl] - Optional API base URL (default: http://localhost:8080)
 * @returns {Promise<{ recipeId: number, ingredientIds: number[] }>} Updated recipe ingredients
 */
export async function postRecipeIngredients(recipeId, ingredientIds, baseUrl = 'http://localhost:8080') {
  const url = `${baseUrl}/recipes/${recipeId}/ingredients`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredientIds }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to post recipe ingredients: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`);
  }

  return response.json();
}
