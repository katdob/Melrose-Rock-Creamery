import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useNewRecipe } from '../../context/NewRecipeContext'

function AddNewRecipe() {
  const { NewRecipe, setNewRecipe } = useNewRecipe()
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const ingredients = NewRecipe.Ingredients ?? [{ Name: '', Unit: '', Amount: '' }]
  const instructions = NewRecipe.Instructions ?? [{ Text: '', Order: '', RecipeId: null }]

  const addIngredient = () => {
    setNewRecipe((prev) => ({
      ...prev,
      Ingredients: [...(prev.Ingredients ?? [{ Name: '', Unit: '', Amount: '' }]), { Name: '', Unit: '', Amount: '' }],
    }))
  }

  const updateIngredient = (index, field, value) => {
    setNewRecipe((prev) => {
      const list = [...(prev.Ingredients ?? [{ Name: '', Unit: '', Amount: '' }])]
      list[index] = { ...list[index], [field]: value }
      return { ...prev, Ingredients: list }
    })
  }

  const addInstruction = () => {
    setNewRecipe((prev) => ({
      ...prev,
      Instructions: [...(prev.Instructions ?? [{ Text: '', Order: '', RecipeId: null }]), { Text: '', Order: '', RecipeId: prev.RecipeId ?? null }],
    }))
  }

  const updateInstruction = (index, field, value) => {
    setNewRecipe((prev) => {
      const list = [...(prev.Instructions ?? [{ Text: '', Order: '', RecipeId: null }])]
      list[index] = { ...list[index], [field]: value }
      return { ...prev, Instructions: list }
    })
  }

  const handleAddRecipe = () => {
    setErrorMessage(null)
    setSuccessMessage(null)
    const errors = []
    if (!NewRecipe.Name || String(NewRecipe.Name).trim() === '') {
      errors.push('Name is required.')
    }
    if (!NewRecipe.Author || String(NewRecipe.Author).trim() === '') {
      errors.push('Author is required.')
    }
    if (!NewRecipe.Ingredients || NewRecipe.Ingredients.length === 0) {
      errors.push('At least one ingredient is required.')
    }
    if (!NewRecipe.Instructions || NewRecipe.Instructions.length === 0) {
      errors.push('At least one instruction is required.')
    }
    if (errors.length > 0) {
      setErrorMessage(errors.join(' '))
      return
    }
    setSuccessMessage('Recipe is ready to be added!')
  }

  return (
    <div className="content-scroll">
      <h2>Add new recipe</h2>
      <p>Add a new recipe here.</p>
      {errorMessage && (
        <div className="add-recipe-error" role="alert">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="add-recipe-success" role="status">
          {successMessage}
        </div>
      )}
      <div>
        <label htmlFor="recipe-name">Name</label>
        <input
          id="recipe-name"
          type="text"
          value={NewRecipe.Name ?? ''}
          onChange={(e) => setNewRecipe((prev) => ({ ...prev, Name: e.target.value }))}
        />
      </div>
      <div>
        <label htmlFor="recipe-author">Author</label>
        <input
          id="recipe-author"
          type="text"
          value={NewRecipe.Author ?? ''}
          onChange={(e) => setNewRecipe((prev) => ({ ...prev, Author: e.target.value }))}
        />
      </div>
      <div>
        <h3>Ingredients</h3>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <label htmlFor={`ingredient-name-${index}`}>Name</label>
            <input
              id={`ingredient-name-${index}`}
              type="text"
              value={ingredient.Name ?? ''}
              onChange={(e) => updateIngredient(index, 'Name', e.target.value)}
            />
            <label htmlFor={`ingredient-unit-${index}`}>Unit</label>
            <input
              id={`ingredient-unit-${index}`}
              type="text"
              value={ingredient.Unit ?? ''}
              onChange={(e) => updateIngredient(index, 'Unit', e.target.value)}
            />
            <label htmlFor={`ingredient-amount-${index}`}>Amount</label>
            <input
              id={`ingredient-amount-${index}`}
              type="text"
              value={ingredient.Amount ?? ''}
              onChange={(e) => updateIngredient(index, 'Amount', e.target.value)}
            />
          </div>
        ))}
        <button type="button" className="add-ingredient-btn" onClick={addIngredient}>
          Add another ingredient
        </button>
      </div>
      <div>
        <h3>Instructions</h3>
        {instructions.map((instruction, index) => (
          <div key={index}>
            <label htmlFor={`instruction-text-${index}`}>Text</label>
            <input
              id={`instruction-text-${index}`}
              type="text"
              value={instruction.Text ?? ''}
              onChange={(e) => updateInstruction(index, 'Text', e.target.value)}
            />
            <label htmlFor={`instruction-order-${index}`}>Order</label>
            <input
              id={`instruction-order-${index}`}
              type="text"
              value={instruction.Order ?? ''}
              onChange={(e) => updateInstruction(index, 'Order', e.target.value)}
            />
          </div>
        ))}
        <button type="button" className="add-ingredient-btn" onClick={addInstruction}>
          Add another instruction
        </button>
      </div>
      <div className="add-recipe-btn-wrap">
        <button type="button" className="add-ingredient-btn" onClick={handleAddRecipe}>
          Add new recipe
        </button>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/recipe-catalogue/add-new-recipe')({
  component: AddNewRecipe,
})
