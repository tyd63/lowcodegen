import type { ComponentPropConfig } from '@/types'

export const createInputProp = (options: ComponentPropConfig) => {
  return {
    key: 'input',
    ...options
  } as ComponentPropConfig
}

export const createSwitchProp = (options: ComponentPropConfig) => {
  return {
    key: 'switch',
    ...options
  } as ComponentPropConfig
}

export const createSelectProp = (options: ComponentPropConfig) => {
  return {
    key: 'select',
    ...options
  } as ComponentPropConfig
}

export const createRadioProp = (options: ComponentPropConfig) => {
  return {
    key: 'radio',
    ...options
  } as ComponentPropConfig
}

export const createInputNumberProp = (options: ComponentPropConfig) => {
  return {
    key: 'inputNumber',
    ...options
  } as ComponentPropConfig
}

export const createIconProp = (options: ComponentPropConfig) => {
  return {
    key: 'icon',
    ...options
  } as ComponentPropConfig
}

export const createSliderProp = (options: ComponentPropConfig) => {
  return {
    key: 'slider',
    ...options
  } as ComponentPropConfig
}

export const createColorProp = (options: ComponentPropConfig) => {
  return {
    key: 'color',
    ...options
  } as ComponentPropConfig
}

export const createDateProp = (options: ComponentPropConfig) => {
  return {
    key: 'date',
    ...options
  } as ComponentPropConfig
}

// 大小
export const createSizeProp = () => {
  return createRadioProp({
    label: '大小',
    value: 'default',
    options: [
      {
        label: '小',
        value: 'small'
      },
      {
        label: '默认',
        value: 'default'
      },
      {
        label: '大',
        value: 'large'
      }
    ]
  })
}
// 类型
export const createTypeProp = (def = 'primary') => {
  return createSelectProp({
    label: '类型',
    value: def,
    options: [
      {
        label: 'Info',
        value: 'info'
      },
      {
        label: 'Primary',
        value: 'primary'
      },
      {
        label: 'Success',
        value: 'success'
      },
      {
        label: 'Warning',
        value: 'warning'
      },
      {
        label: 'Danger',
        value: 'danger'
      }
    ],
    clearable: true
  })
}

export const createOptionsProp = (options: ComponentPropConfig) => {
  return {
    key: 'options',
    ...options
  } as ComponentPropConfig
}

export const createListProp = (options: ComponentPropConfig) => {
  return {
    key: 'list',
    ...options
  } as ComponentPropConfig
}

export const createPlacementProp = (def = 'top') => {
  return createSelectProp({
    label: '出现的位置',
    value: def,
    options: [
      {
        label: '上',
        value: 'top'
      },
      {
        label: '上左',
        value: 'top-start'
      },
      {
        label: '上右',
        value: 'top-end'
      },
      {
        label: '左',
        value: 'left'
      },
      {
        label: '左上',
        value: 'left-start'
      },
      {
        label: '左下',
        value: 'left-end'
      },
      {
        label: '右',
        value: 'right'
      },
      {
        label: '右上',
        value: 'right-start'
      },
      {
        label: '右下',
        value: 'right-end'
      },
      {
        label: '下',
        value: 'bottom'
      },
      {
        label: '下左',
        value: 'bottom-start'
      },
      {
        label: '下右',
        value: 'bottom-end'
      }
    ]
  })
}
