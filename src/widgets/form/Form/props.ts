import { createInputNumberProp, createInputProp, createSizeProp, createRadioProp, createSwitchProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    labelWidth: createInputNumberProp({ label: '标签宽度', value: 80 }),
    labelSuffix: createInputProp({ label: '标签后缀', value: ':', clearable: true }),
    size: createSizeProp(),
    labelPosition: createRadioProp({
      label: '标签位置',
      value: 'right',
      options: [
        { label: '左边', value: 'left' },
        { label: '顶部', value: 'top' },
        { label: '右边', value: 'right' }
      ]
    }),
    requireAsteriskPosition: createRadioProp({
      label: '星号位置',
      value: 'left',
      options: [
        {
          label: '左边',
          value: 'left'
        },
        {
          label: '右边',
          value: 'right'
        }
      ]
    }),
    hideRequiredAsterisk: createSwitchProp({
      label: '隐藏星号',
      value: false
    }),
    disabled: createSwitchProp({ label: '是否禁用', value: false }),
    inline: createSwitchProp({ label: '行内表单', value: false }),
    showMessage: createSwitchProp({ label: '错误信息', value: true })
    // inlineMessage: createSwitchProp({ label: '行内显示', value: false }),
    // scrollToError: createSwitchProp({ label: '校验失败滚动', value: false })
  }
}
