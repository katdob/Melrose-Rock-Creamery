import { clearUserSession, setUserSession, type AuthUserSession } from '../query/userSession.ts'

type GetAuthSessionResponse = {
  user: AuthUserSession
}

export async function getAuthSession(baseUrl: string = ''): Promise<AuthUserSession | null> {
  const url = baseUrl ? `${baseUrl}/auth/session` : '/auth/session'
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  })

  if (response.status === 401) {
    clearUserSession()
    return null
  }

  if (!response.ok) {
    throw new Error(`Failed to get auth session: ${response.status} ${response.statusText}`)
  }

  const data = (await response.json()) as GetAuthSessionResponse
  if (data?.user?.isLoggedIn) {
    setUserSession(data.user)
    return data.user
  }

  clearUserSession()
  return null
}
