import { createInputProp, createSizeProp, createSwitchProp, createTypeProp, createInputNumberProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    content: createInputProp({ label: '内容', value: '文本' }),
    size: createSizeProp(),
    type: createTypeProp(''),
    truncated: createSwitchProp({ label: '显示省略号', value: false }),
    'line-clamp': createInputNumberProp({ label: '最大行数', value: 1, min: 1, max: 99 }),
    tag: createInputProp({ label: '自定义标签', value: 'span' })
  }
}
