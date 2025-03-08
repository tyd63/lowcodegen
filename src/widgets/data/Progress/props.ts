import { createColorProp, createInputNumberProp, createSelectProp, createSwitchProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    percentage: createInputNumberProp({ label: 'percentage', value: 50, min: 0, max: 100 }),
    type: createSelectProp({
      label: '进度条类型',
      value: 'line',
      options: [
        {
          label: 'line',
          value: 'line'
        },
        {
          label: 'circle',
          value: 'circle'
        },
        {
          label: 'dashboard',
          value: 'dashboard'
        }
      ]
    }),
    'stroke-width': createInputNumberProp({
      label: '进度条的宽度',
      value: 6
    }),
    status: createSelectProp({
      label: '进度条当前状态',
      value: '',
      options: [
        {
          label: 'success',
          value: 'success'
        },
        {
          label: 'exception',
          value: 'exception'
        },
        {
          label: 'warning',
          value: 'warning'
        }
      ]
    }),
    duration: createInputNumberProp({
      label: '控制动画进度条速度和条纹进度条流动速度',
      value: 3
    }),
    width: createInputNumberProp({
      label: '环形进度条画布宽度',
      value: 126
    }),
    color: createColorProp({
      label: '进度条背景色'
    }),
    'show-text': createSwitchProp({
      label: '是否显示进度条文字内容',
      value: true
    }),
    'text-inside': createSwitchProp({
      label: '进度条显示文字内置在进度条内',
      value: false
    }),
    indeterminate: createSwitchProp({
      label: '是否为动画进度条',
      value: false
    })
  }
}
