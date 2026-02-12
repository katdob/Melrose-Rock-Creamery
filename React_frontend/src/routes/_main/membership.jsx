import { createFileRoute } from '@tanstack/react-router'
import Membership from '../../screens/Membership'

export const Route = createFileRoute('/_main/membership')({
  component: Membership,
})
