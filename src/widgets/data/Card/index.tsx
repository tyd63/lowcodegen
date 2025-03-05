import { ElCard } from 'element-plus'
import ContainerIcon from '@/icons/Container.vue'
import { defineComponent } from '@/widgets/utils/define'
import { genStyle } from '@/widgets/utils/style'
import { renderSlot } from '@/renderer/renderSlot'
import { genProps } from './props'
import { renderPreview } from '@/widgets/utils/render'

const registerConfig = () => {
  return defineComponent({
    name: '卡片',
    key: 'card',
    group: 'data',
    draggable: true,
    icon: () => <ContainerIcon />,
    props: genProps(),
    model: {},
    style: genStyle(),
    events: [],
    actions: [],
    children: {},
    preview: (component) => {
      return renderPreview({ icon: component.icon, name: component.name })
    },
    render: ({ props, children, id, style }) => {
      const renderContent = () => {
        const slots: Record<string, unknown> = {}
        if (!props.hiddenHeader) {
          slots.header = () => props.title
        }
        slots.default = () => renderSlot(id, 'default', children)
        return slots
      }

      return (
        <ElCard {...props} style={style}>
          {renderContent()}
        </ElCard>
      )
    }
  })
}

export default registerConfig
