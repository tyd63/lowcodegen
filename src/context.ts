import type { InjectionKey } from 'vue'

export interface Context {
  formData: Record<string, any>
}

export const editorInjectionKey: InjectionKey<Context> = Symbol('lc-editor')
