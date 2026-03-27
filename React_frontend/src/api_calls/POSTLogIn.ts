import { setAccessToken } from './auth.ts'
import { setUserSession, type AuthUserSession } from '../query/userSession.ts'

/**
 * Logs in a user and stores JWT access token for API calls.
 *
 * @param email - User email
 * @param password - User password
 * @param baseUrl - Optional API base URL (default: same-origin via nginx)
 */
export async function postLogIn(
  email: string,
  password: string,
  baseUrl: string = '',
): Promise<{
  accessToken: string
  accessTokenExpiresAt: string
  refreshTokenExpiresAt: string
  user: AuthUserSession
}> {
  const url = baseUrl ? `${baseUrl}/auth/login` : '/auth/login'
  const basic = btoa(`${email}:${password}`)

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${basic}`,
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Failed to log in: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`,
    )
  }

  const data = (await response.json()) as {
    accessToken: string
    accessTokenExpiresAt: string
    refreshTokenExpiresAt: string
    user: AuthUserSession
  }

  setAccessToken(data.accessToken)
  setUserSession(data.user)
  return data
}

