import { ElCarouselItem } from 'element-plus'
import ContainerIcon from '@/icons/Container.vue'
import { defineComponent } from '@/widgets/utils/define'
import { genStyle } from '@/widgets/utils/style'
import { renderSlot } from '@/renderer/renderSlot'
import { renderPreview } from '@/widgets/utils/render'

const registerConfig = () => {
  return defineComponent({
    name: '走马灯项',
    key: 'carousel-item',
    group: 'data',
    draggable: true,
    icon: () => <ContainerIcon />,
    props: {},
    model: {},
    style: genStyle(),
    events: [],
    actions: [],
    children: {},
    preview: (component) => {
      return renderPreview({ icon: component.icon, name: component.name })
    },
    render: ({ props, style, id, children }) => {
      return (
        <ElCarouselItem {...props} style={style}>
          {{
            default: () => renderSlot(id, 'default', children)
          }}
        </ElCarouselItem>
      )
    }
  })
}

export default registerConfig
