import { ElSlider, ElInputNumber, ElSelect, ElOption, ElInput, ElSwitch, ElColorPicker, ElDatePicker } from 'element-plus'

import { pick } from 'lodash-es'
import Icons from './Icons'

import { emitter } from '@/utils/emitter'

import LcOptions from './Options'
import RadioButtons from '@/components/RadioButtons'
import LcList from './List'

const updateEvent = (path) => {
  return (value) => {
    emitter.emit('updateDraft', {
      path,
      value
    })
  }
}

export const renderMap = {
  input: ({ value, path, config }) => {
    const _props = pick(config, ['disabled', 'clearable'])
    return <ElInput {..._props} model-value={value} onInput={updateEvent(path)} />
  },
  switch: ({ value, path, config }) => {
    const _props = pick(config, ['disabled'])
    return <ElSwitch {..._props} model-value={value} onChange={updateEvent(path)} />
  },
  select: ({ value, path, config }) => {
    const _props = pick(config, ['disabled', 'clearable'])
    return (
      <ElSelect {..._props} class="w-full" model-value={value} onChange={updateEvent(path)}>
        {config.options?.map((option) => <ElOption label={option.label} value={option.value} />)}
      </ElSelect>
    )
  },
  radio: ({ value, path, config }) => {
    const _props = pick(config, ['disabled'])
    return <RadioButtons {..._props} model-value={value} onChange={updateEvent(path)} options={config.options}></RadioButtons>
  },
  inputNumber: ({ value, path, config }) => {
    const _props = pick(config, ['min', 'max', 'disabled'])
    return <ElInputNumber {..._props} class="w-full" model-value={value} onChange={updateEvent(path)} />
  },
  slider: ({ value, path, config }) => {
    const _props = pick(config, ['min', 'max', 'disabled'])
    return <ElSlider class="w-full" {..._props} model-value={value} onInput={updateEvent(path)} />
  },
  color: ({ value, path, config }) => {
    const _props = pick(config, ['disabled'])
    return <ElColorPicker {..._props} model-value={value} onChange={updateEvent(path)} />
  },
  icon: ({ value, path }) => {
    return <Icons model-value={value} onChange={updateEvent(path)} />
  },
  options: ({ value, path, config }) => {
    return <LcOptions model-value={value} title={config.label} onChange={updateEvent(path)} />
  },
  date: ({ value, path, config }) => {
    const _props = pick(config, ['disabled'])
    return <ElDatePicker {..._props} model-value={value} onChange={updateEvent(path)} />
  },
  list: ({ value, path, config }) => {
    return <LcList model-value={value} title={config.label} onChange={updateEvent(path)} />
  }
}
