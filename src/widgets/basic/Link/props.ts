import { createInputProp, createSwitchProp, createIconProp, createTypeProp, createSelectProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    content: createInputProp({ label: '文本', value: '文字超链接' }),
    type: createTypeProp(),
    href: createInputProp({ label: ' href', value: '' }),
    target: createSelectProp({
      label: 'target',
      value: '_self',
      options: [
        {
          label: '_self',
          value: '_self'
        },
        {
          label: '_blank',
          value: '_blank'
        },
        {
          label: '_parent',
          value: '_parent'
        },
        {
          label: '_top',
          value: '_top'
        }
      ]
    }),
    icon: createIconProp({ label: '图标', value: '' }),
    disabled: createSwitchProp({ label: '是否禁用', value: false }),
    underline: createSwitchProp({ label: '是否下划线', value: true })
  }
}
