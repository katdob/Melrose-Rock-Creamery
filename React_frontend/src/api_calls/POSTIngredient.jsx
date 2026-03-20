/**
 * Submits an ingredient to the API.
 * @param {string} name - Ingredient name
 * @param {string} unit - Ingredient unit
 * @param {number} amount - Ingredient amount
 * @param {string} [baseUrl] - Optional API base URL (default: http://localhost:8080)
 * @returns {Promise<{ id: number, name: string, unit: string, amount: number }>} Created or existing ingredient
 */
export async function postIngredient(name, unit, amount, baseUrl = 'http://localhost:8080') {
  const url = `${baseUrl}/ingredients`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, unit, amount }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to post ingredient: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`);
  }

  return response.json();
}
