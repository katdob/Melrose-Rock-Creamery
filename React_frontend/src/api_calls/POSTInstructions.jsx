/**
 * Submits an instruction to the API.
 * @param {string} text - Instruction text
 * @param {number} order - Instruction order
 * @param {number} recipeId - Recipe ID
 * @param {string} [baseUrl] - Optional API base URL (default: http://localhost:8080)
 * @returns {Promise<{ id: number, text: string, order: number, recipeId: number }>} Created instruction
 */
export async function postInstruction(text, order, recipeId, baseUrl = 'http://localhost:8080') {
  const url = `${baseUrl}/instructions`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, order, recipeId }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to post instruction: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`);
  }

  return response.json();
}
