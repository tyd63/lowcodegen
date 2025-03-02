import { defineComponent } from 'vue'
import { ElInputNumber } from 'element-plus'

import './style.scss'

export default defineComponent({
  props: {
    modelValue: {
      type: Number,
      default: undefined
    },
    step: {
      type: Number,
      default: 0.1
    },
    unit: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    return () => {
      return (
        <div class="lc-animate-input-number">
          <ElInputNumber
            model-value={props.modelValue}
            controls-position="right"
            min={0}
            size="small"
            step={props.step}
            disabled={props.disabled}
            onChange={(value) => emit('change', value)}
          />
          <div class="lc-animate-input-number-unit">{props.unit}</div>
        </div>
      )
    }
  }
})
