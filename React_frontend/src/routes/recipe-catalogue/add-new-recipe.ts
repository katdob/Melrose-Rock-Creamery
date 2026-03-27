import { createFileRoute, redirect } from '@tanstack/react-router'
import AddNewRecipe from '../../screens/AddNewRecipe'
import { requireUserSession } from '../../auth/requireUserSession.ts'
import { requestLoginPopup } from '../../auth/loginPopupRequest.ts'

export const Route = createFileRoute('/recipe-catalogue/add-new-recipe')({
  beforeLoad: async () => {
    const isAllowed = await requireUserSession()
    if (!isAllowed) {
      requestLoginPopup()
      throw redirect({ to: '/menu' })
    }
  },
  component: AddNewRecipe,
})

