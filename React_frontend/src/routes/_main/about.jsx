import { createFileRoute } from '@tanstack/react-router'
import About from '../../screens/About'

export const Route = createFileRoute('/_main/about')({
  component: About,
})
