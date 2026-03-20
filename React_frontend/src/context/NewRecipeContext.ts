import React, { createContext, useContext, useState } from 'react';

type Ingredient = {
  Name: string;
  Unit: string;
  Amount: string;
  IngredientId?: number | null;
};

type Instruction = {
  Text: string;
  Order: string | number;
  RecipeId: number | null;
};

type NewRecipe = {
  Name?: string;
  Author?: string;
  RecipeId?: number | null;
  Ingredients: Ingredient[];
  Instructions: Instruction[];
};

type NewRecipeContextValue = {
  NewRecipe: NewRecipe;
  setNewRecipe: React.Dispatch<React.SetStateAction<NewRecipe>>;
};

const NewRecipeContext = createContext<NewRecipeContextValue | null>(null);

export function NewRecipeProvider({ children }: { children: React.ReactNode }) {
  const [NewRecipe, setNewRecipe] = useState<NewRecipe>({
    Ingredients: [{ Name: '', Unit: '', Amount: '' }],
    Instructions: [{ Text: '', Order: '', RecipeId: null }],
  });

  return React.createElement(
    NewRecipeContext.Provider,
    { value: { NewRecipe, setNewRecipe } },
    children,
  );
}

export function useNewRecipe() {
  const context = useContext(NewRecipeContext);
  if (!context) {
    throw new Error('useNewRecipe must be used within a NewRecipeProvider');
  }
  return context;
}

