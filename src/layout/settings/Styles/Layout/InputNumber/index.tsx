import { defineComponent } from 'vue'
import { ElInputNumber } from 'element-plus'
import PopoverSelect from '@/components/PopoverSelect'

import { getValue, setValue, getUnit } from '../../utils'

import './style.scss'

export default defineComponent({
  props: {
    prop: {
      type: String,
      default: undefined
    },
    model: {
      type: Object,
      default: undefined
    },
    componentStyle: {
      type: Object,
      default: undefined
    }
  },
  setup(props) {
    const config = props.componentStyle[props.prop]

    return () => {
      return (
        <div class="lc-input-number">
          <ElInputNumber
            model-value={getValue(props.model, props.prop, true)}
            size="small"
            controls-position="right"
            min={config.min}
            max={config.max}
            onChange={(val) => setValue(props.model, props.prop, val)}
          />
          {config.options?.length ? (
            <PopoverSelect
              model-value={getUnit(props.model, props.prop)}
              options={config.options}
              //@ts-ignore: attrs
              trigger="click"
              width={58}
              onChange={(unit) => setValue(props.model, props.prop, getValue(props.model, props.prop, true), unit)}
            >
              {{
                trigger({ label }) {
                  return <div class="lc-input-number-unit">{label}</div>
                }
              }}
            </PopoverSelect>
          ) : (
            <div class="lc-input-number-unit">{config.unit}</div>
          )}
        </div>
      )
    }
  }
})
