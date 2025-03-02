import { createInputProp, createSwitchProp, createSizeProp, createIconProp, createInputNumberProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    placeholder: createInputProp({ label: 'placeholder', value: '请输入' }),
    maxlength: createInputNumberProp({ label: '最大长度' }),
    'prefix-icon': createIconProp({ label: '前缀图标' }),
    'suffix-icon': createIconProp({ label: '尾部图标' }),
    size: createSizeProp(),
    disabled: createSwitchProp({ label: '是否禁用', value: false }),
    clearable: createSwitchProp({ label: '显示清除', value: false }),
    readonly: createSwitchProp({ label: '是否只读', value: false }),
    'show-word-limit': createSwitchProp({ label: '展示限制', value: false }),
    'show-password': createSwitchProp({ label: '切换密码', value: false })
  }
}
