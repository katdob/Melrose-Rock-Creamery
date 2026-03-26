export type SearchRecipeIngredient = {
  id: number;
  name: string | null;
  unit: string | null;
  amount: number | null;
};

export type SearchRecipeInstruction = {
  id: number;
  order: number;
  text: string | null;
};

export type SearchRecipe = {
  id: number;
  name: string;
  author: string;
  createdDate: string;
  ingredients: SearchRecipeIngredient[];
  instructions: SearchRecipeInstruction[];
};

export type GetSearchRecipesResponse = {
  results: SearchRecipe[];
};

/**
 * Searches recipes by substring match (name/author/ingredient name),
 * prioritized and paged by the backend endpoint.
 *
 * @param searchCriteria - Search string
 * @param page - 1-based page number
 * @param baseUrl - Optional API base URL (default: same-origin via nginx)
 */
export async function getSearchRecipes(
  searchCriteria: string,
  page: number = 1,
  baseUrl: string = '',
): Promise<GetSearchRecipesResponse> {
  const trimmed = (searchCriteria ?? '').trim();

  const params = new URLSearchParams();
  params.set('searchCriteria', trimmed);
  params.set('Page', String(page));

  const path = `/recipes/search?${params.toString()}`;
  const url = baseUrl ? `${baseUrl}${path}` : path;

  const response = await fetch(url);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to search recipes: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`,
    );
  }

  return (await response.json()) as GetSearchRecipesResponse;
}

