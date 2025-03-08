import { ElTimeline } from 'element-plus'
import ContainerIcon from '@/icons/Container.vue'
import { defineComponent } from '@/widgets/utils/define'
import { genStyle } from '@/widgets/utils/style'
import { renderPreview } from '@/widgets/utils/render'
import registerTimelineItem from './timeline-item'
import { renderSlot } from '@/renderer/renderSlot'

const registerConfig = () => {
  return defineComponent({
    name: '时间线',
    key: 'timeline',
    group: 'data',
    draggable: true,
    icon: () => <ContainerIcon />,
    props: {},
    model: {},
    style: genStyle(),
    events: [],
    actions: [],
    children: {
      default: [registerTimelineItem(), registerTimelineItem(), registerTimelineItem()]
    },
    preview: (component) => {
      return renderPreview({ icon: component.icon, name: component.name })
    },
    render: ({ props, style, children, id }) => {
      return (
        <ElTimeline {...props} style={style}>
          {renderSlot(id, 'default', children)}
        </ElTimeline>
      )
    }
  })
}

export default registerConfig
