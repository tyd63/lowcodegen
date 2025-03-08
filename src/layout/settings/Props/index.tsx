import { defineComponent } from 'vue'
import type { VNode } from 'vue'
import type { ComponentPropConfig } from '@/types'
import { ElForm, ElFormItem, ElIcon, ElTooltip } from 'element-plus'
import { QuestionFilled } from '@element-plus/icons-vue'

import { renderMap } from './RenderMap'

import './style.scss'

export default defineComponent({
  props: {
    draft: {
      type: Object,
      default: undefined
    },
    component: {
      type: Object,
      default: undefined
    }
  },
  setup(props) {
    return () => {
      const content: VNode[] = []

      if (!props.component) return null

      // props
      if (props.component && props.component.props) {
        Object.entries<ComponentPropConfig>(props.component.props).map(([prop, config]) => {
          const defaultRender = renderMap[config.key]?.({
            value: props.draft.props[prop],
            path: `props.${prop}`,
            config
          })
          const child = config.row ? (
            defaultRender
          ) : (
            <ElFormItem>
              {{
                default: () => defaultRender,
                label: () => (
                  <div class="flex items-center gap-x-0.5 flex-wrap overflow-hidden">
                    <span>{config.label}</span>
                    {config.tooltip && (
                      <ElTooltip content={config.tooltip} placement="top">
                        <ElIcon class="cursor-pointer">
                          <QuestionFilled />
                        </ElIcon>
                      </ElTooltip>
                    )}
                  </div>
                )
              }}
            </ElFormItem>
          )

          content.push(child)
        })
      }
      // model
      if (props.component && props.component.model) {
        Object.entries<ComponentPropConfig>(props.component.model).map(([modelName, config]) => {
          content.push(
            <ElFormItem label={config.label}>
              {{
                default: () =>
                  renderMap[config.key]?.({
                    value: props.draft.model[modelName],
                    path: `model.${modelName}`,
                    config
                  }),
                label: () => (
                  <div class="flex items-center gap-x-0.5">
                    {config.label}
                    {config.tooltip && (
                      <ElTooltip content={config.tooltip} placement="top">
                        <ElIcon class="cursor-pointer">
                          <QuestionFilled />
                        </ElIcon>
                      </ElTooltip>
                    )}
                  </div>
                )
              }}
            </ElFormItem>
          )
        })
      }

      if (content.length === 0) {
        content.push(<div class="text-center pt-3 text-xs text-[#999]">该节点无属性</div>)
      }

      return (
        <ElForm class="lc-form" label-position="left" label-width="150">
          <ElFormItem label="组件ID">{props.draft.id}</ElFormItem>
          {content}
        </ElForm>
      )
    }
  }
})
