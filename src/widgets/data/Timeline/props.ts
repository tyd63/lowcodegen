import {
  createColorProp,
  createIconProp,
  createInputNumberProp,
  createInputProp,
  createRadioProp,
  createSizeProp,
  createSwitchProp,
  createTypeProp
} from '@/widgets/utils/props'

export const genProps = () => {
  return {
    timestamp: createInputProp({
      label: '时间戳',
      value: ''
    }),
    placement: createRadioProp({
      label: '时间戳位置',
      value: 'bottom',
      options: [
        {
          label: 'top',
          value: 'top'
        },
        {
          label: 'bottom',
          value: 'bottom'
        }
      ]
    }),
    type: createTypeProp(''),
    icon: createIconProp({
      label: '自定义图标',
      value: ''
    }),
    'hide-timestamp': createSwitchProp({
      label: '是否隐藏时间戳',
      value: false
    }),
    center: createSwitchProp({
      label: '是否垂直居中',
      value: false
    }),
    color: createColorProp({
      label: '节点颜色',
      value: ''
    }),
    hollow: createSwitchProp({
      label: '是否空心点',
      value: false
    })
  }
}
