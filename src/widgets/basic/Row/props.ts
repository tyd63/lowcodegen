import { createInputNumberProp, createSelectProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    gutter: createInputNumberProp({ label: '栅格间隔', value: 0 }),
    justify: createSelectProp({
      label: '水平排列',
      value: 'start',
      options: [
        { label: '左对齐', value: 'start' },
        { label: '水平居中', value: 'center' },
        { label: '均匀对齐', value: 'space-around' },
        { label: '两端对齐', value: 'space-between' },
        { label: '右对齐', value: 'end' }
      ]
    }),
    align: createSelectProp({
      label: '垂直排列',
      value: 'top',
      options: [
        { label: '顶部对齐', value: 'top' },
        { label: '垂直居中', value: 'middle' },
        { label: '底部对齐', value: 'bottom' }
      ]
    })
  }
}
