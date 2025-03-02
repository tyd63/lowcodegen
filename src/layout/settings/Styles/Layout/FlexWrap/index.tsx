import { defineComponent } from 'vue'
import RadioButtons from '@/components/RadioButtons'
import { getValue, setValue } from '../../utils'

export default defineComponent({
  props: {
    model: {
      type: Object,
      default: undefined
    }
  },
  setup(props) {
    const options = [
      {
        value: 'nowrap',
        render() {
          return <span class="text-xs">不换行</span>
        }
      },
      {
        value: 'wrap',
        render() {
          return <span class="text-xs">正换行</span>
        }
      },
      {
        value: 'wrap-reverse',
        render() {
          return <span class="text-xs">逆换行</span>
        }
      }
    ]

    const styleProp = 'flex-wrap'

    return () => {
      return (
        <div class="flex items-center gap-x-2">
          <span
            class={[
              'text-xs w-[48px] flex justify-between',
              {
                'text-[var(--el-color-primary)]': !!props.model[styleProp]
              }
            ]}
          >
            <span>换</span>
            <span>行</span>
          </span>
          <RadioButtons
            model-value={getValue(props.model, styleProp)}
            options={options}
            onChange={(value) => {
              setValue(props.model, styleProp, value)
            }}
          />
        </div>
      )
    }
  }
})
