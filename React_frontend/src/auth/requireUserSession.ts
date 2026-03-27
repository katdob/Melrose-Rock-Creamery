import { getAuthSession } from '../api_calls/GETAuthSession.ts'
import { getUserSession, type AuthUserSession } from '../query/userSession.ts'

function hasContextUser(session: AuthUserSession): boolean {
  return Boolean(session.isLoggedIn && session.email.trim() && session.firstName.trim())
}

export async function requireUserSession(): Promise<boolean> {
  const currentSession = getUserSession()
  if (hasContextUser(currentSession)) return true

  const refreshedSession = await getAuthSession()
  return refreshedSession ? hasContextUser(refreshedSession) : false
}
