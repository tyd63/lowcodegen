import { onMounted, onUnmounted } from 'vue'

export const useKeyboard = (key: string, cb: (key?: string) => void) => {
  const handler = (e: KeyboardEvent) => {
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
      e.preventDefault()
      e.stopPropagation()
      cb(key)
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('keydown', handler)
  })
}
