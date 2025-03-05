import { createInputProp, createSwitchProp, createSizeProp, createOptionsProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    placeholder: createInputProp({ label: 'placeholder', value: '请选择' }),
    size: createSizeProp(),
    disabled: createSwitchProp({ label: '是否禁用', value: false }),
    clearable: createSwitchProp({ label: '是否可清空', value: false }),
    filterable: createSwitchProp({ label: '是否可搜索', value: false }),
    options: createOptionsProp({
      row: true,
      value: [
        { label: 'label1', value: 'value1', disabled: false },
        { label: 'label2', value: 'value2', disabled: false }
      ]
    })
  }
}
