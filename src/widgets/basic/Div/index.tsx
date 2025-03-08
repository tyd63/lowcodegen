import ContainerIcon from '@/icons/Container.vue'
import { defineComponent } from '@/widgets/utils/define'
import { genStyle } from '@/widgets/utils/style'
import { renderPreview } from '@/widgets/utils/render'
import { renderSlot } from '@/renderer/renderSlot'
import { createInputProp } from '@/widgets/utils/props'

const registerConfig = () => {
  return defineComponent({
    name: 'Div',
    key: 'div',
    group: 'basic',
    draggable: true,
    icon: () => <ContainerIcon />,
    props: {
      content: createInputProp({
        label: '内容',
        value: '',
        clearable: true
      })
    },
    model: {},
    style: genStyle(),
    events: [],
    actions: [],
    preview: (component) => {
      return renderPreview({ icon: component.icon, name: component.name })
    },
    render: ({ props, style, children, id }) => {
      const renderContent = () => {
        if (props.content) {
          return props.content
        }
        return renderSlot(id, 'default', children)
      }
      return (
        <div {...props} style={style}>
          {renderContent()}
        </div>
      )
    }
  })
}

export default registerConfig
