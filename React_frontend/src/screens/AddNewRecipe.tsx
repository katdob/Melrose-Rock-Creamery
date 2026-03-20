import { useState } from 'react'
import { useNewRecipe } from '../context/NewRecipeContext.ts'
import { postRecipe } from '../api_calls/POSTRecipe.ts'
import { postIngredient } from '../api_calls/POSTIngredient.ts'
import { postInstruction } from '../api_calls/POSTInstructions.ts'

export default function AddNewRecipe() {
  const { NewRecipe, setNewRecipe } = useNewRecipe()
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const ingredients = NewRecipe.Ingredients ?? [{ Name: '', Unit: '', Amount: '' }]
  const instructions = NewRecipe.Instructions ?? [{ Text: '', Order: '', RecipeId: null }]

  const addIngredient = () => {
    setNewRecipe((prev) => ({
      ...prev,
      Ingredients: [
        ...(prev.Ingredients ?? [{ Name: '', Unit: '', Amount: '' }]),
        { Name: '', Unit: '', Amount: '' },
      ],
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
      Instructions: [
        ...(prev.Instructions ?? [{ Text: '', Order: '', RecipeId: null }]),
        { Text: '', Order: '', RecipeId: prev.RecipeId ?? null },
      ],
    }))
  }

  const updateInstruction = (index, field, value) => {
    setNewRecipe((prev) => {
      const list = [...(prev.Instructions ?? [{ Text: '', Order: '', RecipeId: null }])]
      list[index] = { ...list[index], [field]: value }
      return { ...prev, Instructions: list }
    })
  }

  const handleAddRecipe = async () => {
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

    try {
      const created = await postRecipe(NewRecipe.Name.trim(), NewRecipe.Author.trim())
      const recipeId = created.id
      setNewRecipe((prev) => ({ ...prev, RecipeId: recipeId }))

      const ingredients = NewRecipe.Ingredients ?? []
      const results = await Promise.all(
        ingredients.map((ing) =>
          postIngredient(String(ing.Name ?? '').trim(), String(ing.Unit ?? '').trim(), Number(ing.Amount) || 0),
        ),
      )

      const ingredientsWithIds = ingredients.map((ing, i) => ({
        ...ing,
        IngredientId: results[i]?.id ?? null,
      }))
      setNewRecipe((prev) => ({ ...prev, Ingredients: ingredientsWithIds }))

      const instructions = NewRecipe.Instructions ?? []
      await Promise.all(
        instructions.map((inst) =>
          postInstruction(String(inst.Text ?? '').trim(), Number(inst.Order) || 0, recipeId),
        ),
      )

      setSuccessMessage(`Recipe "${created.name}" was added.`)
      setShowSuccessPopup(true)
    } catch (err) {
      setErrorMessage(err.message || 'Failed to add recipe.')
    }
  }

  return (
    <div className="content-scroll">
      {showSuccessPopup && (
        <div className="popup-overlay" role="dialog" aria-labelledby="recipe-created-title">
          <div className="popup-container recipe-created-popup">
            <div className="popup-content recipe-created-popup-content">
              <h2 id="recipe-created-title">Recipe created</h2>
              <p>
                <strong>Name:</strong> {NewRecipe.Name}
              </p>
              <p>
                <strong>Author:</strong> {NewRecipe.Author}
              </p>
              <h3>Ingredients</h3>
              <ul className="recipe-created-list">
                {(NewRecipe.Ingredients ?? []).map((ing, i) => (
                  <li key={i}>
                    {ing.Name} — {ing.Unit} {ing.Amount}
                  </li>
                ))}
              </ul>
              <h3>Instructions</h3>
              <ul className="recipe-created-list">
                {(NewRecipe.Instructions ?? []).map((inst, i) => (
                  <li key={i}>
                    {inst.Order}. {inst.Text}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="add-ingredient-btn"
                onClick={() => setShowSuccessPopup(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <h2>Add new recipe</h2> */}
      {/* <p>Add a new recipe here.</p> */}

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

      <div className="form-group recipe-name-field">
        <label htmlFor="recipe-name">Name</label>
        <input
          id="recipe-name"
          type="text"
          className="recipe-name-input"
          placeholder="Enter recipe name"
          value={NewRecipe.Name ?? ''}
          onChange={(e) => setNewRecipe((prev) => ({ ...prev, Name: e.target.value }))}
        />
      </div>

      <div className="form-group recipe-name-field">
        <label htmlFor="recipe-author">Author</label>
        <input
          id="recipe-author"
          type="text"
          className="recipe-name-input"
          placeholder="Enter author name"
          value={NewRecipe.Author ?? ''}
          onChange={(e) => setNewRecipe((prev) => ({ ...prev, Author: e.target.value }))}
        />
      </div>

      <div>
        <h3>Ingredients</h3>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-row">
            <div className="form-group recipe-name-field">
              <label htmlFor={`ingredient-name-${index}`}>Name</label>
              <input
                id={`ingredient-name-${index}`}
                type="text"
                className="recipe-name-input"
                placeholder="Ingredient name"
                value={ingredient.Name ?? ''}
                onChange={(e) => updateIngredient(index, 'Name', e.target.value)}
              />
            </div>

            <div className="form-group recipe-name-field">
              <label htmlFor={`ingredient-unit-${index}`}>Unit</label>
              <input
                id={`ingredient-unit-${index}`}
                type="text"
                className="recipe-name-input"
                placeholder="e.g. cups, tbsp"
                value={ingredient.Unit ?? ''}
                onChange={(e) => updateIngredient(index, 'Unit', e.target.value)}
              />
            </div>

            <div className="form-group recipe-name-field">
              <label htmlFor={`ingredient-amount-${index}`}>Amount</label>
              <input
                id={`ingredient-amount-${index}`}
                type="text"
                className="recipe-name-input"
                placeholder="e.g. 2, 1/2"
                value={ingredient.Amount ?? ''}
                onChange={(e) => updateIngredient(index, 'Amount', e.target.value)}
              />
            </div>
          </div>
        ))}

        <button type="button" className="add-ingredient-btn" onClick={addIngredient}>
          Add another ingredient
        </button>
      </div>

      <div>
        <h3>Instructions</h3>
        {instructions.map((instruction, index) => (
          <div key={index} className="ingredient-row">
            {/* the AI failed several times to tell me why these form-group divs were shrinking the width, so I fixed it myself  */}
            <div className="form-group recipe-name-field" style={{ width: '100%', minWidth: '35rem' }}>
              <label htmlFor={`instruction-text-${index}`}>Text</label>
              <input
                id={`instruction-text-${index}`}
                type="text"
                className="recipe-name-input"
                placeholder="the instructions to follow..."
                value={instruction.Text ?? ''}
                onChange={(e) => updateInstruction(index, 'Text', e.target.value)}
              />
            </div>

            <div className="form-group recipe-name-field" style={{ width: '100%', minWidth: '35rem' }}>
              <label htmlFor={`instruction-order-${index}`}>Order</label>
              <input
                id={`instruction-order-${index}`}
                type="text"
                className="recipe-name-input"
                placeholder="1, first instruction to follow..."
                value={instruction.Order ?? ''}
                onChange={(e) => updateInstruction(index, 'Order', e.target.value)}
              />
            </div>
          </div>
        ))}

        <button type="button" className="add-ingredient-btn" onClick={addInstruction}>
          Add another instruction
        </button>
      </div>

      <div className="add-recipe-btn-wrap">
        {/* the AI failed to "make the button bigger" in a reasonable way, so I did this myself */}
        <button
          type="button"
          className="add-ingredient-btn"
          onClick={handleAddRecipe}
          style={{ fontSize: '1.5rem' }}
        >
          Add new recipe
        </button>
      </div>
    </div>
  )
}

