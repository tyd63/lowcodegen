import { createInputProp, createRadioProp, createSelectProp, createSwitchProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    title: createInputProp({ label: '标题', value: '这是标题' }),
    borderStyle: createSelectProp({
      label: '分隔样式',
      value: 'solid',
      options: [
        {
          label: '隐藏',
          value: 'none'
        },
        {
          label: '实线',
          value: 'solid'
        },
        {
          label: '虚线',
          value: 'dashed'
        }
      ]
    }),
    direction: createRadioProp({
      label: '方向',
      value: 'horizontal',
      options: [
        {
          label: '水平',
          value: 'horizontal'
        },
        {
          label: '垂直',
          value: 'vertical'
        }
      ]
    }),
    contentPosition: createRadioProp({
      label: '标题位置',
      value: 'center',
      options: [
        {
          label: '左边',
          value: 'left'
        },
        {
          label: '居中',
          value: 'center'
        },
        {
          label: '右边',
          value: 'right'
        }
      ]
    }),
    slot: createSwitchProp({ label: '开启插槽', value: false })
  }
}
