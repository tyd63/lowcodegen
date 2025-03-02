import { ElDialog, ElButton, ElDrawer } from 'element-plus'
import { createVNode, defineComponent, reactive, render } from 'vue'
import type { RenderFunction } from 'vue'
import MonacoEditor from '../MonacoEditor'

export interface LcDialogOptions {
  title?: string
  width?: string | number
  readonly?: boolean
  language?: 'json' | 'html'
  content?: string
  footer?: boolean
  loader?: 'dialog' | 'drawer'
  onConfirm?: (content?: string) => void
  default?: RenderFunction
}

const DialogComponent = defineComponent({
  props: {
    options: {
      type: Object,
      default: undefined
    }
  },
  setup(props, ctx) {
    const state = reactive({
      options: props.options,
      visible: false,
      code: ''
    })
    ctx.expose({
      show() {
        state.visible = true
      },
      hide() {
        state.visible = false
      }
    })
    const onCancel = () => {
      state.visible = false
    }
    const onConfirm = () => {
      state.options.onConfirm?.(state.code)
    }

    const onclose = () => {
      state.options.destroy?.()
    }

    return () => {
      const Component = {
        dialog: ElDialog,
        drawer: ElDrawer
      }[state.options.loader || 'dialog']

      return (
        <Component
          v-model={state.visible}
          title={state.options.title}
          width={state.options.width}
          size={state.options.width || '50%'}
          onClosed={onclose}
        >
          {{
            default:
              state.options.default ||
              (() => {
                return (
                  <MonacoEditor
                    language={state.options.language}
                    code={state.options.content}
                    readonly={state.options.readonly}
                    onChange={(val: string) => (state.code = val)}
                  />
                )
              }),
            footer: () =>
              state.options.footer && (
                <div>
                  <ElButton onClick={onCancel}>取消</ElButton>
                  <ElButton type="primary" onClick={onConfirm}>
                    确认
                  </ElButton>
                </div>
              )
          }}
        </Component>
      )
    }
  }
})

export const $dialog = (options: LcDialogOptions) => {
  const el = document.createElement('div')
  const destroy = () => {
    render(null, el)
  }
  const vm = createVNode(DialogComponent, { options: { ...options, destroy } })
  render(vm, el)
  document.body.appendChild(el.firstElementChild!)
  const { show, hide } = vm.component?.exposed || {}
  show && show()
  return () => hide()
}
