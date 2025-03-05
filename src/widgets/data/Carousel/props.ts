import { createInputNumberProp, createInputProp, createRadioProp, createSwitchProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    height: createInputProp({ label: '高度', value: '' }),
    'initial-index': createInputNumberProp({ label: '幻灯片索引', value: 0, min: 0 }),
    interval: createInputNumberProp({ label: '自动切换间隔(毫秒)', value: 3000 }),
    trigger: createRadioProp({
      label: '触发方式',
      value: 'click',
      options: [
        {
          label: '鼠标移入',
          value: 'hover'
        },
        {
          label: '鼠标点击',
          value: 'click'
        }
      ]
    }),
    type: createRadioProp({
      label: 'carousel的类型',
      value: '',
      options: [
        {
          label: '默认',
          value: ''
        },
        {
          label: '卡片',
          value: 'card'
        }
      ]
    }),
    autoplay: createSwitchProp({ label: '自动切换', value: false }),
    loop: createSwitchProp({ label: '是否循环显示', value: false })
  }
}
