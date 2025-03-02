import { createInputProp, createSelectProp, createSwitchProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    title: createInputProp({ label: '标题', value: '卡牌标题' }),
    shadow: createSelectProp({
      label: '阴影状态',
      value: 'never',
      options: [
        {
          label: '一直都有',
          value: 'always'
        },
        {
          label: '鼠标经过',
          value: 'hover'
        },
        {
          label: '从不',
          value: 'never'
        }
      ]
    }),
    hiddenHeader: createSwitchProp({ label: '隐藏标题', value: false })
  }
}
