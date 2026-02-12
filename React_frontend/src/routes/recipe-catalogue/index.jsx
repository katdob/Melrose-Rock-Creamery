import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/recipe-catalogue/')({
  beforeLoad: () => {
    throw redirect({ to: '/recipe-catalogue/my-recipes' })
  },
})
