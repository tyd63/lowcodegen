import { ElRow } from 'element-plus'
import ContainerIcon from '@/icons/Container.vue'
import { defineComponent } from '@/widgets/utils/define'
import { genStyle } from '@/widgets/utils/style'
import { renderSlot } from '@/renderer/renderSlot'
import { genProps } from './props'
import { renderPreview } from '@/widgets/utils/render'

export const registerConfig = () => {
  return defineComponent({
    name: 'Row',
    key: 'row',
    group: 'basic',
    draggable: true,
    icon: () => <ContainerIcon />,
    props: genProps(),
    model: {},
    style: genStyle(),
    events: [],
    actions: [],
    children: { default: [] },
    preview: (component) => {
      return renderPreview({ icon: component.icon, name: component.name })
    },
    render: ({ props, children, style, id }) => {
      return (
        <ElRow {...props} style={style}>
          {renderSlot(id, 'default', children)}
        </ElRow>
      )
    }
  })
}

export default registerConfig
