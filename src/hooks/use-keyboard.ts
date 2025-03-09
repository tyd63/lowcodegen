import { onMounted, onUnmounted } from 'vue'

export const useKeyboard = (key: string, cb: (key?: string) => void) => {
  const handler = (e: KeyboardEvent) => {
    e.preventDefault()
    let pass = true
    key.split('+').forEach((part) => {
      if (/^\[(.*?)\]$/.test(part)) {
        part = part.slice(1, -1)
      }
      if (!part.split(',').some((p) => e[p] || e.key === p)) {
        pass = false
      }
    })
    if (pass) {
      cb(key)
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handler)
  })
  onUnmounted(() => {
    window.removeEventListener('keydown', handler)
  })
}
