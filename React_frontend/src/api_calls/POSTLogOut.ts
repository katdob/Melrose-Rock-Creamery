import { authorizedFetch, setAccessToken } from './auth.ts'
import { clearUserSession } from '../query/userSession.ts'

export async function postLogOut(email: string, baseUrl: string = ''): Promise<{ message: string }> {
  const trimmedEmail = email.trim()
  if (!trimmedEmail) {
    throw new Error('Email is required to log out.')
  }

  const url = baseUrl ? `${baseUrl}/auth/logout` : '/auth/logout'
  const response = await authorizedFetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: trimmedEmail }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Failed to log out: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`,
    )
  }

  setAccessToken(null)
  clearUserSession()

  return (await response.json()) as { message: string }
}
