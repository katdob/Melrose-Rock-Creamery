let accessToken: string | null = null

export function setAccessToken(token: string | null): void {
  accessToken = token
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

export async function authorizedFetch(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers ?? {})
  if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`)

  const method = (init.method ?? 'GET').toUpperCase()
  if (method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS') {
    const csrfToken = getCookie('csrf_token')
    if (csrfToken) headers.set('X-CSRF-TOKEN', csrfToken)
  }

  return fetch(input, {
    ...init,
    headers,
    credentials: 'include',
  })
}

