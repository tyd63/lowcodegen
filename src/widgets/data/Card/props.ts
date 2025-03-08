import { createInputProp, createRadioProp, createSwitchProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    title: createInputProp({ label: '卡牌标题', value: '卡牌标题' }),
    shadow: createRadioProp({
      label: '阴影状态',
      value: 'never',
      options: [
        {
          label: 'always',
          value: 'always'
        },
        {
          label: 'hover',
          value: 'hover'
        },
        {
          label: 'never',
          value: 'never'
        }
      ]
    }),
    hiddenHeader: createSwitchProp({ label: '隐藏标题', value: false })
  }
}
