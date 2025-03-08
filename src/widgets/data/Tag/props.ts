import {
  createColorProp,
  createInputNumberProp,
  createInputProp,
  createRadioProp,
  createSizeProp,
  createSwitchProp,
  createTypeProp
} from '@/widgets/utils/props'

export const genProps = () => {
  return {
    content: createInputProp({ label: '标签内容', value: 'Tag 1' }),
    type: createTypeProp('success'),
    size: createSizeProp(),
    effect: createRadioProp({
      label: 'Tag 的主题',
      value: 'light',
      options: [
        {
          label: 'dark',
          value: 'dark'
        },
        {
          label: 'light',
          value: 'light'
        },
        {
          label: 'plain',
          value: 'plain'
        }
      ]
    }),
    closable: createSwitchProp({
      label: '是否可关闭',
      value: false
    }),
    'disable-transitions': createSwitchProp({
      label: '是否禁用渐变动画',
      value: true
    }),
    hit: createSwitchProp({
      label: '是否有边框描边',
      value: false
    }),
    round: createSwitchProp({
      label: 'Tag 是否为圆形',
      value: false
    }),
    color: createColorProp({
      label: '背景色',
      value: ''
    })
  }
}
