/**
 * Fetches an ingredient by name, unit, and amount from the API.
 *
 * @param name - Ingredient name
 * @param unit - Ingredient unit
 * @param amount - Ingredient amount
 * @param baseUrl - Optional API base URL (default: http://localhost:8080)
 * @returns Ingredient or null if not found (HTTP 404)
 */
export async function getIngredient(
  name: string,
  unit: string,
  amount: number,
  baseUrl: string = 'http://localhost:8080',
): Promise<{ id: number; name: string; unit: string; amount: number } | null> {
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

