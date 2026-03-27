import { useQuery } from '@tanstack/react-query'
import { queryClient } from './queryClient.ts'

export type AuthUserSession = {
  firstName: string
  lastName: string
  email: string
  isLoggedIn: boolean
}

const USER_SESSION_QUERY_KEY = ['auth-user-session'] as const

const EMPTY_SESSION: AuthUserSession = {
  firstName: '',
  lastName: '',
  email: '',
  isLoggedIn: false,
}

export function setUserSession(session: AuthUserSession): void {
  queryClient.setQueryData(USER_SESSION_QUERY_KEY, session)
}

export function clearUserSession(): void {
  queryClient.setQueryData(USER_SESSION_QUERY_KEY, EMPTY_SESSION)
}

export function getUserSession(): AuthUserSession {
  return queryClient.getQueryData<AuthUserSession>(USER_SESSION_QUERY_KEY) ?? EMPTY_SESSION
}

export function useUserSession() {
  return useQuery({
    queryKey: USER_SESSION_QUERY_KEY,
    queryFn: async () => getUserSession(),
    initialData: getUserSession(),
    staleTime: Infinity,
    gcTime: Infinity,
  })
}

