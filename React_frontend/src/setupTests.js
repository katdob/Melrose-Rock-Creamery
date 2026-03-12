import '@testing-library/jest-dom'

// Ensure jsdom document has the same favicon link as the real app.
if (!document.querySelector('link[rel="icon"]')) {
  const link = document.createElement('link')
  link.rel = 'icon'
  link.href = '/favicon.svg'
  document.head.appendChild(link)
}

