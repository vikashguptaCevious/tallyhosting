export type ToastKind = 'success' | 'error'

export type ToastPayload = {
  id: number
  message: string
  kind: ToastKind
}

type Listener = (toast: ToastPayload) => void

let listener: Listener | null = null
let seq = 0

export function subscribeToast(next: Listener | null) {
  listener = next
  return () => {
    if (listener === next) listener = null
  }
}

export function showToast(message: string, kind: ToastKind = 'success') {
  listener?.({ id: ++seq, message, kind })
}
