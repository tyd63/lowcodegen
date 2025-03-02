import ContainerIcon from '@/icons/Container.vue'
import { defineComponent } from '@/widgets/utils/define'
import { genStyle } from '@/widgets/utils/style'
import { renderPreview } from '@/widgets/utils/render'
import { renderSlot } from '@/renderer/renderSlot'

import { ElSpace } from 'element-plus'

import { genProps } from './props'

const registerConfig = () => {
  return defineComponent({
    name: '间隙',
    key: 'space',
    group: 'basic',
    draggable: true,
    icon: () => <ContainerIcon />,
    props: genProps(),
    model: {},
    style: genStyle({
      width: {
        value: '100%'
      }
    }),
    events: [],
    actions: [],
    preview: (component) => {
      return renderPreview({ icon: component.icon, name: component.name })
    },
    render: ({ props, style, children, id }) => {
      const renderItems = () => {
        const contents = []
        for (let i = 0; i < props.items; i++) {
          contents.push(renderSlot(id, `Slot${i + 1}`, children))
        }
        return contents
      }

      return (
        <ElSpace {...props} style={style}>
          {renderItems()}
        </ElSpace>
      )
    }
  })
}

export default registerConfig
