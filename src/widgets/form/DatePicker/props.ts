import { createInputProp, createSwitchProp, createSizeProp, createSelectProp, createIconProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    placeholder: createInputProp({ label: 'placeholder', value: '请选择日期' }),
    type: createSelectProp({
      label: '日期类型',
      options: [
        {
          label: '日期',
          value: 'date'
        },
        {
          label: '周',
          value: 'week'
        },
        {
          label: '月',
          value: 'month'
        },
        {
          label: '年',
          value: 'year'
        }
      ],
      value: 'date'
    }),
    format: createInputProp({ label: '输入框格式', value: 'YYYY-MM-DD' }),
    'value-format': createInputProp({ label: '绑定值格式', value: undefined }),
    'prefix-icon': createIconProp({ label: '前缀图标', value: undefined }),
    size: createSizeProp(),
    disabled: createSwitchProp({ label: '是否禁用', value: false }),
    readonly: createSwitchProp({ label: '是否只读', value: false }),
    clearable: createSwitchProp({ label: '显示清除', value: false }),
    editable: createSwitchProp({ label: '文本框可输入', value: false })
  }
}

export const genTypeProp = () => {
  return createSelectProp({
    label: '面板模式',
    options: [
      {
        label: '日期范围',
        value: 'daterange'
      },
      {
        label: '月份范围',
        value: 'monthrange'
      }
    ],
    value: 'daterange'
  })
}
