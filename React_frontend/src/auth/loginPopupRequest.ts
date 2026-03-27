type Listener = () => void

let shouldOpenLoginPopup = false
const listeners = new Set<Listener>()

export function requestLoginPopup(): void {
  shouldOpenLoginPopup = true
  for (const listener of listeners) {
    listener()
  }
}

export function consumeLoginPopupRequest(): boolean {
  if (!shouldOpenLoginPopup) return false
  shouldOpenLoginPopup = false
  return true
}

export function subscribeLoginPopupRequests(listener: Listener): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
