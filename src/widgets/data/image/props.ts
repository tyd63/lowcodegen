import { createInputProp, createSelectProp, createSwitchProp, createListProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    src: createInputProp({ label: '图片源地址', value: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' }),
    alt: createInputProp({ label: '原生属性 alt', value: '' }),
    fit: createSelectProp({
      label: '图片如何适应容器框',
      value: '',
      clearable: true,
      options: [
        {
          label: 'fill',
          value: 'fill'
        },
        {
          label: 'contain',
          value: 'contain'
        },
        {
          label: 'cover',
          value: 'cover'
        },
        {
          label: 'none',
          value: 'none'
        },
        {
          label: 'scale-down',
          value: 'scale-down'
        }
      ]
    }),
    'hide-on-click-modal': createSwitchProp({
      label: '是否可以通过点击遮罩层关闭',
      value: false
    }),
    lazy: createSwitchProp({
      label: '是否懒加载',
      value: false
    }),
    'preview-src-list': createListProp({
      row: true,
      label: '图片预览',
      value: []
    })
  }
}
