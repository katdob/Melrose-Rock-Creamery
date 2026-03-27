import { authorizedFetch } from './auth.ts'

/**
 * Submits an ingredient to the API.
 *
 * @param name - Ingredient name
 * @param unit - Ingredient unit
 * @param amount - Ingredient amount
 * @param baseUrl - Optional API base URL (default: same-origin via nginx)
 * @returns Created or existing ingredient
 */
export async function postIngredient(
  name: string,
  unit: string,
  amount: number,
  baseUrl: string = '',
): Promise<{ id: number; name: string; unit: string; amount: number }> {
  const url = baseUrl ? `${baseUrl}/ingredients` : `/ingredients`;

  const response = await authorizedFetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, unit, amount }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to post ingredient: ${response.status} ${response.statusText}${
        errorText ? ` - ${errorText}` : ''
      }`,
    );
  }

  return response.json();
}

