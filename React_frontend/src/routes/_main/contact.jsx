import { createFileRoute } from '@tanstack/react-router'
import Contact from '../../screens/Contact'

export const Route = createFileRoute('/_main/contact')({
  component: Contact,
})
