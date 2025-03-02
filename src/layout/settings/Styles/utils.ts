// import { events } from 'VE/utils/event'

import { emitter } from '@/utils/emitter'

const UNITS = ['px', '%']
const INVALID = [null, undefined, '']
const CARRY_UNIT_SNIPPET = ['margin', 'padding', 'width', 'height']

export const getUnit = (model: Record<string, string | number>, styleProp: string) => {
  if (!CARRY_UNIT_SNIPPET.some((snippet) => styleProp?.includes(snippet))) return ''
  const matcher = String(model?.[styleProp]).match(new RegExp(`(${UNITS.join('|')})$`, 'g'))
  let unit = UNITS[0]
  if (matcher) {
    unit = matcher[0]
  }
  return unit
}

export const getValue = (model: Record<string, string | number>, styleProp: string, transNumber?: boolean) => {
  const value = model?.[styleProp] as string
  if (INVALID.includes(value)) {
    return
  }
  const _value = String(value).replace(new RegExp(UNITS.join('|') + '$', 'g'), '')
  if (transNumber) {
    return Number(_value)
  }
  return _value
}

export const setValue = (model: Record<string, string | number>, styleProp: string, value: any, unit?: string) => {
  const _unit = unit ?? getUnit(model, styleProp)
  const _value = INVALID.includes(value) ? undefined : value + _unit
  emitter.emit('updateDraft', { path: `style.${styleProp}`, value: _value })
}
