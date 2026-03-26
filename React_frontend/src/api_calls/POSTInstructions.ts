/**
 * Submits an instruction to the API.
 *
 * @param text - Instruction text
 * @param order - Instruction order
 * @param recipeId - Recipe ID
 * @param baseUrl - Optional API base URL (default: same-origin via nginx)
 * @returns Created instruction
 */
export async function postInstruction(
  text: string,
  order: number,
  recipeId: number,
  baseUrl: string = '',
): Promise<{ id: number; text: string; order: number; recipeId: number }> {
  const url = baseUrl ? `${baseUrl}/instructions` : `/instructions`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, order, recipeId }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to post instruction: ${response.status} ${response.statusText}${
        errorText ? ` - ${errorText}` : ''
      }`,
    );
  }

  return response.json();
}

