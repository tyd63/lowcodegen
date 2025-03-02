import { createSwitchProp, createSizeProp, createInputNumberProp, createRadioProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    min: createInputNumberProp({ label: '最小数值' }),
    max: createInputNumberProp({ label: '最大数值' }),
    step: createInputNumberProp({ label: '计数步长', value: 1 }),
    size: createSizeProp(),
    controlsPosition: createRadioProp({
      label: '按钮位置',
      options: [
        {
          label: '默认',
          value: ''
        },
        {
          label: '右侧',
          value: 'right'
        }
      ],
      value: ''
    }),
    disabled: createSwitchProp({ label: '是否禁用', value: false }),
    readonly: createSwitchProp({ label: '是否只读', value: false }),
    controls: createSwitchProp({ label: '控制按钮', value: true })
  }
}
