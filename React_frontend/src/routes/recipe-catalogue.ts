import { createFileRoute } from '@tanstack/react-router'
import RecipeCatalogue from '../screens/RecipeCatalogue.ts'

export const Route = createFileRoute('/recipe-catalogue')({
  component: RecipeCatalogue,
})

