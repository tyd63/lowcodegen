import { ElIcon, ElInput, ElButton } from 'element-plus'
import { defineComponent, watch, ref } from 'vue'
import CssIcon from '@/icons/Css.vue'
import { emitter } from '@/utils/emitter'
import { isEqual } from 'lodash-es'

export default defineComponent({
  props: {
    model: {
      type: Object,
      default: undefined
    }
  },
  setup(props) {
    const cssCode = ref('{}')
    const disabled = ref(true)

    let newStyle = null

    const onCodeInput = (value) => {
      cssCode.value = value
      try {
        newStyle = JSON.parse(value)
      } catch (error) {
        return
      }
      const oldStyle = JSON.parse(JSON.stringify(props.model))
      disabled.value = isEqual(newStyle, oldStyle)
    }

    watch(
      () => props.model,
      () => {
        cssCode.value = JSON.stringify(props.model, null, 2)
      },
      {
        deep: true,
        immediate: true
      }
    )

    const save = () => {
      if (!disabled.value) {
        emitter.emit('updateDraft', {
          path: 'style',
          value: newStyle
        })
        disabled.value = true
      }
    }

    return () => {
      return (
        <div class="lc-code-controller">
          <div class="flex items-center justify-between">
            <ElIcon color="#999" size={20}>
              <CssIcon />
            </ElIcon>
            <ElButton size="small" class="px-1.5 py-3" disabled={disabled.value} onClick={save}>
              保存
            </ElButton>
          </div>
          <ElInput autosize={{ minRows: 10, maxRows: 10 }} model-value={cssCode.value} class="mt-2" type="textarea" onInput={onCodeInput}></ElInput>
        </div>
      )
    }
  }
})
