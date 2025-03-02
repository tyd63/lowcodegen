import type { CSSProperties } from 'vue'
import { cloneDeep } from 'lodash-es'

import type { ComponentStyleConfig } from '@/types'

export const withUnitProp = (options?: Partial<ComponentStyleConfig>): ComponentStyleConfig => {
  const styleConfig: ComponentStyleConfig = {
    value: undefined,
    options: [
      {
        label: 'px',
        value: 'px'
      },
      {
        label: '%',
        value: '%'
      }
    ],
    min: 0,
    max: Infinity,
    ...options
  }
  return styleConfig
}

export const genStyle = (defaultStyle?: Partial<Record<keyof CSSProperties, ComponentStyleConfig>>) => {
  const style = {
    width: withUnitProp({ min: 1, max: 9999 }),
    height: withUnitProp({ min: 1, max: 9999 }),
    'margin-top': withUnitProp(),
    'margin-bottom': withUnitProp(),
    'margin-left': withUnitProp(),
    'margin-right': withUnitProp(),
    'padding-top': withUnitProp(),
    'padding-bottom': withUnitProp(),
    'padding-left': withUnitProp(),
    'padding-right': withUnitProp(),
    ...defaultStyle
  }
  return cloneDeep(style)
}
