import { inject } from 'vue'
import { editorInjectionKey } from '../context'

export const useContext = () => {
  const context = inject(editorInjectionKey)
  return {
    context
  }
}
