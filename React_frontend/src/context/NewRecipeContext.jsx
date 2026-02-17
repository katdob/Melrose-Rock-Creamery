import { createContext, useContext, useState } from 'react'

const NewRecipeContext = createContext(null)

export function NewRecipeProvider({ children }) {
  const [NewRecipe, setNewRecipe] = useState({
    Ingredients: [{ Name: '', Unit: '', Amount: '' }],
    Instructions: [{ Text: '', Order: '', RecipeId: null }],
  })

  return (
    <NewRecipeContext.Provider value={{ NewRecipe, setNewRecipe }}>
      {children}
    </NewRecipeContext.Provider>
  )
}

export function useNewRecipe() {
  const context = useContext(NewRecipeContext)
  if (!context) {
    throw new Error('useNewRecipe must be used within a NewRecipeProvider')
  }
  return context
}
