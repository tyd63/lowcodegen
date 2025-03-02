import { createIconProp, createInputNumberProp, createInputProp, createSizeProp, createSwitchProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    width: createInputNumberProp({ label: '宽度' }),
    'active-icon': createIconProp({ label: '激活图标' }),
    'inactive-icon': createIconProp({ label: '未激活图标' }),
    'active-text': createInputProp({ label: '激活文本' }),
    'inactive-text': createInputProp({ label: '未激活文本' }),
    size: createSizeProp(),
    disabled: createSwitchProp({ label: '是否禁用', value: false }),
    'inline-prompt': createSwitchProp({ label: '行内提示', value: false })
  }
}
