/**
 * Posts a recipe to the API.
 * @param {string} name - Recipe name
 * @param {string} author - Recipe author
 * @param {string} [baseUrl] - Optional API base URL (default: http://localhost:8080)
 * @returns {Promise<{ id: number, name: string, author: string, createdDate: string }>} Created recipe
 */
export async function postRecipe(name, author, baseUrl = 'http://localhost:8080') {
  const url = `${baseUrl}/recipes`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, author }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to post recipe: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`);
  }

  return response.json();
}
