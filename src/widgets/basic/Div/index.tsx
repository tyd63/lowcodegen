import ContainerIcon from '@/icons/Container.vue'
import { defineComponent } from '@/widgets/utils/define'
import { genStyle } from '@/widgets/utils/style'
import { renderPreview } from '@/widgets/utils/render'
import { renderSlot } from '@/renderer/renderSlot'

const registerConfig = () => {
  return defineComponent({
    name: 'Div',
    key: 'div',
    group: 'basic',
    draggable: true,
    icon: () => <ContainerIcon />,
    props: {},
    model: {},
    style: genStyle(),
    events: [],
    actions: [],
    preview: (component) => {
      return renderPreview({ icon: component.icon, name: component.name })
    },
    render: ({ props, style, children, id }) => {
      return (
        <div {...props} style={style}>
          {renderSlot(id, 'default', children)}
        </div>
      )
    }
  })
}

export default registerConfig
