import { authorizedFetch } from './auth.ts'

/**
 * Posts a recipe to the API.
 *
 * @param name - Recipe name
 * @param author - Recipe author
 * @param shareable - Whether recipe is shareable
 * @param baseUrl - Optional API base URL (default: same-origin via nginx)
 * @returns Created recipe
 */
export async function postRecipe(
  name: string,
  author: string,
  shareable: boolean = false,
  baseUrl: string = '',
): Promise<{
  id: number
  name: string
  author: string
  createdDate: string
  shareable: boolean
  creatingUser: number | null
}> {
  const url = baseUrl ? `${baseUrl}/recipes` : `/recipes`;

  const response = await authorizedFetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, author, shareable }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to post recipe: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`,
    );
  }

  return response.json();
}
