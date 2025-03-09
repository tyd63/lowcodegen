import { createOptionsProp, createSizeProp, createSwitchProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    size: createSizeProp(),
    disabled: createSwitchProp({ label: '是否禁用', value: false }),
    border: createSwitchProp({ label: '显示边框', value: false }),
    options: createOptionsProp({
      label: '指定可选项',
      row: true,
      value: [
        { label: 'Option1', value: 'option1' },
        { label: 'Option2', value: 'option2' }
      ]
    })
  }
}
