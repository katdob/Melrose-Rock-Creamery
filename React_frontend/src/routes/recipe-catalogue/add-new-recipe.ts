import { createFileRoute } from '@tanstack/react-router'
import AddNewRecipe from '../../screens/AddNewRecipe'

export const Route = createFileRoute('/recipe-catalogue/add-new-recipe')({
  component: AddNewRecipe,
})

