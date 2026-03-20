/**
 * Assigns ingredient IDs to a recipe.
 *
 * @param recipeId - Recipe ID
 * @param ingredientIds - Array of ingredient IDs
 * @param baseUrl - Optional API base URL (default: http://localhost:8080)
 * @returns Updated recipe ingredients
 */
export async function postRecipeIngredients(
  recipeId: number,
  ingredientIds: number[],
  baseUrl: string = 'http://localhost:8080',
): Promise<{ recipeId: number; ingredientIds: number[] }> {
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
    throw new Error(
      `Failed to post recipe ingredients: ${response.status} ${response.statusText}${
        errorText ? ` - ${errorText}` : ''
      }`,
    );
  }

  return response.json();
}

