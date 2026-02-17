import { createFileRoute } from '@tanstack/react-router'

function AddNewRecipe() {
  return (
    <div className="content-scroll">
      <h2>Add new recipe</h2>
      <p>Add a new recipe here.</p>
    </div>
  )
}

export const Route = createFileRoute('/recipe-catalogue/add-new-recipe')({
  component: AddNewRecipe,
})
