import { createFileRoute } from '@tanstack/react-router'
import Recipes from '../../screens/Recipes'

export const Route = createFileRoute('/_main/recipes')({
  component: Recipes,
})
