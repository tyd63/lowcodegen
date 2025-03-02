import * as Icons from '@element-plus/icons-vue'
import { defineComponent } from 'vue'
import { ElIcon, ElPopover, ElInput, ElScrollbar } from 'element-plus'

import './style.scss'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: undefined
    }
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    const renderIcons = (() => {
      return Object.keys(Icons).map((key) => {
        return { name: key, Component: Icons[key] }
      })
    })()

    const handleIcon = (name) => {
      emit('update:modelValue', name)
      emit('change', name)
    }

    const handleCancel = (e: MouseEvent) => {
      e.stopPropagation()
      emit('update:modelValue', '')
      emit('change', '')
    }

    return () => {
      const ActiveIcon = Icons[props.modelValue] ?? 'i'
      return (
        <div class="lc-icons-select">
          <ElPopover popper-class="lc-icons-popover" placement="bottom-start" trigger="click" width="450">
            {{
              reference() {
                return (
                  <ElInput readonly model-value={props.modelValue}>
                    {{
                      prepend() {
                        return (
                          <ElIcon>
                            <ActiveIcon />
                          </ElIcon>
                        )
                      },
                      append() {
                        return (
                          <ElIcon class="cursor-pointer" onClick={handleCancel}>
                            <Icons.CircleClose />
                          </ElIcon>
                        )
                      }
                    }}
                  </ElInput>
                )
              },
              default() {
                return (
                  <ElScrollbar>
                    <div class="flex p-3 pr-0 gap-2 flex-wrap">
                      {renderIcons.map((icon) => (
                        <div
                          class={[
                            'flex cursor-pointer p-1.5 rounded-md hover:bg-[var(--el-fill-color-light)] active:bg-[var(--el-fill-color-lighter)]',
                            {
                              'bg-[var(--el-fill-color-dark)]': icon.name === props.modelValue
                            }
                          ]}
                          onClick={() => handleIcon(icon.name)}
                        >
                          <ElIcon key={icon.name} size={20}>
                            <icon.Component />
                          </ElIcon>
                        </div>
                      ))}
                    </div>
                  </ElScrollbar>
                )
              }
            }}
          </ElPopover>
        </div>
      )
    }
  }
})
