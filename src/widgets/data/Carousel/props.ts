import { createInputNumberProp, createInputProp, createRadioProp, createSwitchProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    'initial-index': createInputNumberProp({ label: '初始状态激活的幻灯片的索引，从0开始', value: 0, min: 0 }),
    interval: createInputNumberProp({ label: '自动切换间隔(毫秒)', value: 3000 }),
    height: createInputProp({ label: '高度', value: '' }),
    trigger: createRadioProp({
      label: '指示器的触发方式',
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
    'indicator-position': createRadioProp({
      label: '指示器的位置',
      value: 'none',
      options: [
        {
          label: '内部',
          value: ''
        },
        {
          label: '不显示',
          value: 'none'
        },
        {
          label: '外部',
          value: 'outside'
        }
      ]
    }),
    direction: createRadioProp({
      label: '展示的方向',
      value: 'horizontal',
      options: [
        {
          label: '水平',
          value: 'horizontal'
        },
        {
          label: '竖直',
          value: 'vertical'
        }
      ]
    }),
    arrow: createRadioProp({
      label: '切换箭头的显示时机',
      value: 'hover',
      options: [
        { label: '一直', value: 'always' },
        {
          label: '鼠标移入',
          value: 'hover'
        },
        {
          label: '不显示',
          value: 'never'
        }
      ]
    }),
    autoplay: createSwitchProp({ label: '是否自动切换', value: false }),
    loop: createSwitchProp({ label: '是否循环显示', value: false }),
    'pause-on-hover': createSwitchProp({ label: '鼠标悬浮时暂停自动切换', value: true }),
    'motion-blur': createSwitchProp({ label: '添加动态模糊以给走马灯注入活力和流畅性', value: false })
  }
}
