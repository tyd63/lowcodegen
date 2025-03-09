import { ElForm } from 'element-plus'
import Container from '@/icons/Container.vue'
import { defineComponent } from '@/widgets/utils/define'
import { genStyle } from '@/widgets/utils/style'
import { renderPreview } from '@/widgets/utils/render'
import { renderSlot } from '@/renderer/renderSlot'
import { genProps } from './props'
import { getFormDemo } from './getFormDemo'

const registerConfig = () => {
  return defineComponent({
    name: '表单',
    key: 'form',
    group: 'form',
    draggable: true,
    icon: () => <Container />,
    props: genProps(),
    model: {},
    style: genStyle(),
    events: [],
    actions: [],
    children: {
      default: getFormDemo()
    },
    preview: (component) => {
      return renderPreview({ icon: component.icon, name: component.name })
    },
    render: ({ props, children, id, style }) => {
      return (
        <ElForm {...props} style={style}>
          {renderSlot(id, 'default', children)}
        </ElForm>
      )
    }
  })
}

export default registerConfig
