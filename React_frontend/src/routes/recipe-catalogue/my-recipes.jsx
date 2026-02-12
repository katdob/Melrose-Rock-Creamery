import { createFileRoute } from '@tanstack/react-router'

function MyRecipes() {
  return (
    <div className="content-scroll">
      <h2>My Recipes</h2>
      <p>Your saved recipes will appear here.</p>
    </div>
  )
}

export const Route = createFileRoute('/recipe-catalogue/my-recipes')({
  component: MyRecipes,
})
