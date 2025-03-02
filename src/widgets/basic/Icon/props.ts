import { createIconProp, createInputNumberProp, createColorProp, createSwitchProp } from '@/widgets/utils/props'

export const genProps = () => {
  return {
    icon: createIconProp({ label: '图标', value: 'Avatar' }),
    size: createInputNumberProp({ label: '大小', value: 20 }),
    color: createColorProp({ label: '颜色', value: '' }),
    spin: createSwitchProp({ label: '旋转', value: false })
  }
}
