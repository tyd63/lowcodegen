import { defineComponent } from 'vue'
import { ElButton, ElInput } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
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
      origin.push({ value: '' })
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
          <div class="flex flex-col gap-2">
            {props.modelValue.map((item) => (
              <div class="flex items-center">
                <ElInput v-model={item.value} onChange={update}></ElInput>
                <ElButton icon={Delete} text onClick={() => del(item)}></ElButton>
              </div>
            ))}
          </div>
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
