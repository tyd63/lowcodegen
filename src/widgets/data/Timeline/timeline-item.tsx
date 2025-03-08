import { ElTimelineItem } from 'element-plus'
import ContainerIcon from '@/icons/Container.vue'
import { defineComponent } from '@/widgets/utils/define'
import { genStyle } from '@/widgets/utils/style'
import { genProps } from './props'
import { renderPreview } from '@/widgets/utils/render'
import { renderSlot } from '@/renderer/renderSlot'

const registerConfig = () => {
  return defineComponent({
    name: '时间线项',
    key: 'timeline-item',
    group: 'data',
    draggable: false,
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
    render: ({ props, style, children, id }) => {
      return (
        <ElTimelineItem {...props} style={style}>
          {{
            default: () => renderSlot(id, 'default', children)
          }}
        </ElTimelineItem>
      )
    }
  })
}

export default registerConfig
