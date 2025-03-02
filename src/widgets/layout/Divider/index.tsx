import { ElDivider } from 'element-plus'
import ContainerIcon from '@/icons/Container.vue'
import { defineComponent } from '@/widgets/utils/define'
import { genStyle } from '@/widgets/utils/style'
import { renderPreview } from '@/widgets/utils/render'
import { renderSlot } from '@/renderer/renderSlot'
import { genProps } from './props'

const registerConfig = () => {
  return defineComponent({
    name: '分割线',
    key: 'divider',
    group: 'other',
    draggable: true,
    icon: () => <ContainerIcon />,
    props: genProps(),
    model: {},
    style: genStyle(),
    events: [],
    actions: [],
    preview: (component) => {
      return renderPreview({ icon: component.icon, name: component.name })
    },
    render: ({ props, children, id }) => {
      return <ElDivider {...props}>{props.slot ? renderSlot(id, 'default', children) : props.title}</ElDivider>
    }
  })
}

export default registerConfig
