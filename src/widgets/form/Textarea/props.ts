import { createInputProp, createSwitchProp, createInputNumberProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    placeholder: createInputProp({ label: 'placeholder', value: '请输入' }),
    maxlength: createInputNumberProp({ label: '最大长度' }),
    disabled: createSwitchProp({ label: '是否禁用', value: false }),
    'show-word-limit': createSwitchProp({ label: '展示限制', value: false }),
    autosize: createSwitchProp({ label: '自动高度', value: false }),
    readonly: createSwitchProp({ label: '是否只读', value: false })
  }
}
