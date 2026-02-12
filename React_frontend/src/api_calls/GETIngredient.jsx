/**
 * Fetches an ingredient by name, unit, and amount from the API.
 * @param {string} name - Ingredient name
 * @param {string} unit - Ingredient unit
 * @param {number} amount - Ingredient amount
 * @param {string} [baseUrl] - Optional API base URL (default: http://localhost:8080)
 * @returns {Promise<{ id: number, name: string, unit: string, amount: number } | null>} Ingredient or null if not found
 */
export async function getIngredient(name, unit, amount, baseUrl = 'http://localhost:8080') {
  const params = new URLSearchParams({ name, unit, amount: String(amount) });
  const url = `${baseUrl}/ingredients/by-name-unit-amount?${params}`;

  const response = await fetch(url);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch ingredient: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
