import { ElFormItem } from 'element-plus'
import Container from '@/icons/Container.vue'
import { defineComponent } from '@/widgets/utils/define'
import { genStyle } from '@/widgets/utils/style'
import { renderPreview } from '@/widgets/utils/render'
import { renderSlot } from '@/renderer/renderSlot'
import { genProps } from './props'

const registerConfig = () => {
  return defineComponent({
    name: '表单项',
    key: 'formItem',
    group: 'form',
    draggable: true,
    icon: () => <Container />,
    props: genProps(),
    model: {},
    style: genStyle(),
    events: [],
    actions: [],
    children: {},
    preview: (component) => {
      return renderPreview({ icon: component.icon, name: component.name })
    },
    render: ({ props, style, children, id }) => {
      return (
        <ElFormItem {...props} style={style}>
          {{
            default: () => renderSlot(id, 'default', children)
          }}
        </ElFormItem>
      )
    }
  })
}

export default registerConfig
