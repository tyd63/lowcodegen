import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { ElTooltip } from 'element-plus'
import './style.scss'

interface Option {
  label?: string
  value: string | number
  render?: () => any
  tooltip?: string
}

export default defineComponent({
  props: {
    options: {
      type: Array as PropType<Option[]>,
      default: () => []
    },
    modelValue: {
      type: [String, Number],
      default: undefined
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const toggle = ({ value }) => {
      if (value === props.modelValue) {
        value = ''
      }
      emit('update:modelValue', value)
      emit('change', value)
    }

    return () => {
      const renderOption = (opt) => {
        const option = (
          <div
            class={[
              'lc-radio',
              {
                'is-active': props.modelValue === opt.value
              }
            ]}
            onClick={() => toggle(opt)}
          >
            {opt.render ? opt.render() : opt.label}
          </div>
        )

        if (opt.tooltip) {
          return (
            <ElTooltip content={opt.tooltip} placement="top" enterable={false} hide-after={50} offset={6}>
              {option}
            </ElTooltip>
          )
        }
        return option
      }

      return <div class="lc-radio-buttons">{props.options.map((opt: Option) => renderOption(opt))}</div>
    }
  }
})
