import { createInputNumberProp, createInputProp, createSizeProp, createSwitchProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    label: createInputProp({ label: '标签文本', value: '表单项' }),
    prop: createInputProp({ label: 'model键名', value: '' }),
    // labelWidth: createInputNumberProp({ label: '标签宽度', value: 80 }),
    // size: createSizeProp(),
    required: createSwitchProp({ label: '是否必填', value: false }),
    showMessage: createSwitchProp({ label: '错误信息', value: true }),
    inlineMessage: createSwitchProp({ label: '行内错误信息', value: false })
  }
}
