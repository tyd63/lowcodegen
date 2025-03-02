import { createInputNumberProp, createSelectProp, createSwitchProp, createInputProp, createRadioProp, createSliderProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    items: createInputNumberProp({ label: '子元素数', value: 2, min: 1 }),
    alignment: createSelectProp({
      label: '对齐方式',
      value: 'center',
      options: [
        { label: '左对齐', value: 'start' },
        { label: '右对齐', value: 'end' },
        { label: '垂直居中', value: 'center' },
        { label: '基线对齐', value: 'baseline' }
      ]
    }),
    direction: createRadioProp({
      label: '排列方向',
      value: 'horizontal',
      options: [
        { label: '垂直', value: 'vertical' },
        { label: '水平', value: 'horizontal' }
      ]
    }),
    spacer: createInputProp({ label: '间隔符', value: '' }),
    size: createInputNumberProp({ label: '间隔大小', value: 8, min: 0, max: 999 }),
    wrap: createSwitchProp({ label: '自动换行', value: false }),
    fill: createSwitchProp({ label: '子元素填充', value: false }),
    'fill-ratio': createSliderProp({ label: '填充比例', value: 100, min: 1, max: 100 })
  }
}
