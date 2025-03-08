import { createInputNumberProp, createInputProp, createSwitchProp, createTypeProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    value: createInputNumberProp({ label: '显示值', value: 10 }),
    max: createInputNumberProp({
      label: '最大值，超过最大值会显示 {max}+',
      value: 99
    }),
    type: createTypeProp('danger'),
    color: createInputProp({ label: '背景色', value: '' }),
    'is-dot': createSwitchProp({ label: '是否显示小圆点', value: false }),
    hidden: createSwitchProp({ label: '是否隐藏 Badge', value: false }),
    'show-zero': createSwitchProp({ label: '值为零时是否显示 Badge', value: false })
  }
}
