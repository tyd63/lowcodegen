import {
  createInputProp,
  createRadioProp,
  createSizeProp,
  createSwitchProp,
  createIconProp,
  createTypeProp,
  createColorProp
} from '@/widgets/utils/props'

export const genProps = () => {
  return {
    content: createInputProp({ label: '文本', value: '按钮' }),
    type: createTypeProp(),
    icon: createIconProp({ label: '图标', value: '' }),
    nativeType: createRadioProp({
      label: '原生属性',
      value: 'button',
      options: [
        {
          label: '按钮',
          value: 'button'
        },
        {
          label: '提交',
          value: 'submit'
        },
        {
          label: '重置',
          value: 'reset'
        }
      ]
    }),
    size: createSizeProp(),
    color: createColorProp({ label: '自定义颜色', value: '' }),
    link: createSwitchProp({ label: '链接按钮', value: false }),
    text: createSwitchProp({ label: '文字按钮', value: false }),
    plain: createSwitchProp({ label: '朴素按钮', value: false }),
    round: createSwitchProp({ label: '圆角按钮', value: false }),
    circle: createSwitchProp({ label: '圆形按钮', value: false }),
    disabled: createSwitchProp({ label: '是否禁用', value: false }),
    loading: createSwitchProp({ label: '加载状态', value: false }),
    autofocus: createSwitchProp({ label: '自动聚焦', value: false })
  }
}
