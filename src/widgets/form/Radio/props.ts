import { createOptionsProp, createSizeProp, createSwitchProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    size: createSizeProp(),
    disabled: createSwitchProp({ label: '是否禁用', value: false }),
    options: createOptionsProp({
      label: 'Options',
      row: true,
      value: [
        { label: 'radio1', value: 'radio1' },
        { label: 'radio2', value: 'radio2' }
      ]
    })
  }
}
