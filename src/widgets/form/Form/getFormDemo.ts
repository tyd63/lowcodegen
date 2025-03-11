import registerFormItemConfig from '../FormItem'

import registerInputConfig from '../Input'
import registerTextareaConfig from '../Textarea'
import registerSelectConfig from '../Select'
import registerMultipleSelectConfig from '../Select/multiple'
import registerDateConfig from '../DatePicker/Date'
import registerSwitchConfig from '../Switch'
import registerCheckboxConfig from '../Checkbox'
import registerRadioConfig from '../Radio'
import registerInputNumberConfig from '../InputNumber'
import registerRateConfig from '../Rate'
import registerSliderConfig from '../Slider'

export const getFormDemo = () => {
  const formItemConfig1 = registerFormItemConfig()
  const inputConfig = registerInputConfig()
  inputConfig.style.width.value = '100%'
  formItemConfig1.props.label.value = 'Input'
  formItemConfig1.children.default = [inputConfig]

  const formItemConfig2 = registerFormItemConfig()
  const textareaConfig = registerTextareaConfig()
  textareaConfig.style.width.value = '100%'
  formItemConfig2.props.label.value = 'Textarea'
  formItemConfig2.children.default = [textareaConfig]

  const formItemConfig3 = registerFormItemConfig()
  const selectConfig = registerSelectConfig()
  selectConfig.style.width.value = '100%'
  formItemConfig3.props.label.value = 'Select'
  formItemConfig3.children.default = [selectConfig]

  const formItemConfig4 = registerFormItemConfig()
  const multipleSelectConfig = registerMultipleSelectConfig()
  multipleSelectConfig.style.width.value = '100%'
  formItemConfig4.props.label.value = 'Multiple Select'
  formItemConfig4.children.default = [multipleSelectConfig]

  const formItemConfig5 = registerFormItemConfig()
  const dateConfig = registerDateConfig()
  formItemConfig5.props.label.value = 'Datetime'
  formItemConfig5.children.default = [dateConfig]

  const formItemConfig6 = registerFormItemConfig()
  const switchConfig = registerSwitchConfig()
  formItemConfig6.props.label.value = 'Switch'
  formItemConfig6.children.default = [switchConfig]

  const formItemConfig7 = registerFormItemConfig()
  const checkboxConfig = registerCheckboxConfig()
  formItemConfig7.props.label.value = 'Checkbox'
  formItemConfig7.children.default = [checkboxConfig]

  const formItemConfig8 = registerFormItemConfig()
  const radioConfig = registerRadioConfig()
  formItemConfig8.props.label.value = 'Radio'
  formItemConfig8.children.default = [radioConfig]

  const formItemConfig9 = registerFormItemConfig()
  const inputNumberConfig = registerInputNumberConfig()
  formItemConfig9.props.label.value = 'InputNumber'
  formItemConfig9.children.default = [inputNumberConfig]

  const formItemConfig10 = registerFormItemConfig()
  const rateConfig = registerRateConfig()
  formItemConfig10.props.label.value = 'Rate'
  formItemConfig10.children.default = [rateConfig]

  const formItemConfig11 = registerFormItemConfig()
  const sliderConfig = registerSliderConfig()
  sliderConfig.style.width.value = '100%'
  formItemConfig11.props.label.value = 'Rate'
  formItemConfig11.children.default = [sliderConfig]

  return [
    formItemConfig1,
    formItemConfig2,
    formItemConfig3,
    formItemConfig4,
    formItemConfig5,
    formItemConfig6,
    formItemConfig7,
    formItemConfig8,
    formItemConfig9,
    formItemConfig10,
    formItemConfig11
  ]
}
