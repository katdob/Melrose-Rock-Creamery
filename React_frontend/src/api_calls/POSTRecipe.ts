/**
 * Posts a recipe to the API.
 *
 * @param name - Recipe name
 * @param author - Recipe author
 * @param baseUrl - Optional API base URL (default: http://localhost:8080)
 * @returns Created recipe
 */
export async function postRecipe(
  name: string,
  author: string,
  baseUrl: string = 'http://localhost:8080',
): Promise<{ id: number; name: string; author: string; createdDate: string }> {
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
    throw new Error(
      `Failed to post recipe: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`,
    );
  }

  return response.json();
}

