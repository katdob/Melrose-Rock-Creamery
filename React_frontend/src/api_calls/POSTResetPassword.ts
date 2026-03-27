/**
 * Requests a password reset email for the provided address.
 * Backend intentionally returns the same result whether the email exists or not.
 */
export async function postResetPassword(
  email: string,
  baseUrl: string = '',
): Promise<{ message: string }> {
  const url = baseUrl ? `${baseUrl}/auth/reset-password` : '/auth/reset-password'

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Failed to request password reset: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`,
    )
  }

  return (await response.json()) as { message: string }
}

