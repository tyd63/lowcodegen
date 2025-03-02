import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import { ElPopover, ElIcon } from 'element-plus'
import { Check } from '@element-plus/icons-vue'

import './style.scss'

export default defineComponent({
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
      default: undefined
    },
    options: {
      type: Array as PropType<{ label: string; value: string | number }[]>,
      default: () => []
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { slots, attrs, emit }) {
    const popoverRef = ref()

    const handleOption = (opt) => {
      emit('update:modelValue', opt.value)
      emit('change', opt.value)

      popoverRef.value?.hide()
    }

    return () => {
      const option = props.options.find((opt) => opt.value === props.modelValue)
      return (
        <ElPopover ref={popoverRef} {...attrs} popper-class="lc-popover-select">
          {{
            reference() {
              return slots.trigger?.(option)
            },
            default() {
              return (
                <>
                  {props.options.map((opt) => (
                    <div
                      class="
                  h-[26px]
                  pl-3
                  flex
                  items-center
                  gap-x-1
                  cursor-pointer
                  hover:bg-[var(--el-fill-color-light)]
                  text-xs
                  "
                      onClick={() => handleOption(opt)}
                    >
                      <ElIcon>{opt.value === props.modelValue ? <Check /> : null}</ElIcon>
                      {opt.label}
                    </div>
                  ))}
                </>
              )
            }
          }}
        </ElPopover>
      )
    }
  }
})
