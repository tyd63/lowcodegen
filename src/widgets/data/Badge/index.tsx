import { ElBadge } from 'element-plus'
import ContainerIcon from '@/icons/Container.vue'
import { defineComponent } from '@/widgets/utils/define'
import { genStyle } from '@/widgets/utils/style'
import { renderSlot } from '@/renderer/renderSlot'
import { genProps } from './props'
import { renderPreview } from '@/widgets/utils/render'

const registerConfig = () => {
  return defineComponent({
    name: '徽章',
    key: 'badge',
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
      return (
        <ElBadge {...props} style={style}>
          {renderSlot(id, 'default', children)}
        </ElBadge>
      )
    }
  })
}

export default registerConfig
