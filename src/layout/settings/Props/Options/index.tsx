import { defineComponent } from 'vue'
import { ElButton, ElIcon, ElInput, ElSwitch } from 'element-plus'
import { Delete, Setting } from '@element-plus/icons-vue'
import Collapse from '@/components/Collapse'

export default defineComponent({
  props: {
    modelValue: {
      type: Array,
      default: undefined
    },
    title: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const del = (row) => {
      const origin = props.modelValue.slice()
      const index = origin.findIndex((r) => r === row)
      if (~index) {
        origin.splice(index, 1)
        emit('update:modelValue', origin)
        emit('change', origin)
      }
    }

    const add = () => {
      const origin = props.modelValue.slice()
      const suffix = origin.length + 1
      origin.push({ value: `value${suffix}`, label: `label${suffix}` })
      emit('update:modelValue', origin)
      emit('change', origin)
    }

    const update = () => {
      const origin = props.modelValue.slice()
      emit('update:modelValue', origin)
      emit('change', origin)
    }

    return () => {
      return (
        <Collapse style="margin: 0 -16px 12px;border:0;" title={props.title} default-collapse>
          <table class="text-xs w-full table-auto">
            <thead>
              <tr>
                <th>标题</th>
                <th>值</th>
                <th>禁用</th>
                <th>
                  <ElIcon>
                    <Setting></Setting>
                  </ElIcon>
                </th>
              </tr>
            </thead>
            <tbody>
              {props.modelValue.map((item: { value: string; label: string; disabled: boolean }) => (
                <tr>
                  <td class="p-1.5">
                    <ElInput v-model={item.label} onChange={update}></ElInput>
                  </td>
                  <td class="p-1.5">
                    <ElInput v-model={item.value} onChange={update}></ElInput>
                  </td>
                  <td class="p-1.5">
                    <ElSwitch v-model={item.disabled} onChange={update}></ElSwitch>
                  </td>
                  <td class="p-1.5">
                    <ElButton icon={Delete} text onClick={() => del(item)}></ElButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div class="mt-2">
            <ElButton link size="small" type="primary" onClick={add}>
              添加一项 +
            </ElButton>
          </div>
        </Collapse>
      )
    }
  }
})
