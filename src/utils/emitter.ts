import mitt from 'mitt'
import type { Block } from '@/types'

type EmitterEvents = {
  updateDraft: { path?: string; value?: any; block?: Block }
}

export const emitter = mitt<EmitterEvents>()
