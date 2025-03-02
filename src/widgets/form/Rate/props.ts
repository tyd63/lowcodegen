import { createSwitchProp, createSizeProp, createIconProp, createInputNumberProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    max: createInputNumberProp({ label: '最大分值', value: 5 }),
    'void-icon': createIconProp({ label: '未选中图标' }),
    size: createSizeProp(),
    disabled: createSwitchProp({ label: '是否禁用', value: false }),
    allowHalf: createSwitchProp({ label: '是否允许半选', value: false }),
    showScore: createSwitchProp({ label: '显示分数', value: false })
  }
}
