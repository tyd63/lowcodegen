import { createSwitchProp, createSizeProp, createSelectProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    'color-format': createSelectProp({
      label: '颜色格式',
      options: [
        {
          label: 'hex',
          value: 'hex'
        },
        {
          label: 'rgb',
          value: 'rgb'
        },
        {
          label: 'rgba',
          value: 'rgba'
        },
        {
          label: 'hsl',
          value: 'hsl'
        },
        {
          label: 'hsla',
          value: 'hsla'
        }
      ],
      value: 'hex'
    }),
    size: createSizeProp(),
    disabled: createSwitchProp({ label: '是否禁用', value: false }),
    'show-alpha': createSwitchProp({ label: '透明度选择', value: false })
  }
}
