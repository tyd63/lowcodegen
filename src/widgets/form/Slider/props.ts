import { createSwitchProp, createSizeProp, createIconProp, createInputNumberProp, createPlacementProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    max: createInputNumberProp({ label: '最大值' }),
    min: createInputNumberProp({ label: '最小值' }),
    step: createInputNumberProp({ label: '步长' }),
    height: createInputNumberProp({ label: '高度' }),
    placement: createPlacementProp(),
    size: createSizeProp(),
    disabled: createSwitchProp({ label: '是否禁用', value: false }),
    vertical: createSwitchProp({ label: '竖向模式', value: false }),
    range: createSwitchProp({ label: '范围选择', value: false }),
    'show-stops': createSwitchProp({ label: '显示间断点', value: false }),
    'show-tooltip': createSwitchProp({ label: '显示提示', value: false })
  }
}
