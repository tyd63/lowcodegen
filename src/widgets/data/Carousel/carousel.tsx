import { ElCarousel } from 'element-plus'
import ContainerIcon from '@/icons/Container.vue'
import { defineComponent } from '@/widgets/utils/define'
import { genStyle } from '@/widgets/utils/style'
import { renderSlot } from '@/renderer/renderSlot'
import { genProps } from './props'
import { renderPreview } from '@/widgets/utils/render'
import registerCarouselItem from './carousel-item'

const registerConfig = () => {
  return defineComponent({
    name: '走马灯',
    key: 'carousel',
    group: 'data',
    draggable: true,
    icon: () => <ContainerIcon />,
    props: genProps(),
    model: {},
    style: genStyle(),
    events: [],
    actions: [],
    children: {
      default: [registerCarouselItem(), registerCarouselItem(), registerCarouselItem()]
    },
    preview: (component) => {
      return renderPreview({ icon: component.icon, name: component.name })
    },
    render: ({ props, children, id, style }) => {
      return (
        <ElCarousel {...props} style={style}>
          {renderSlot(id, 'default', children)}
        </ElCarousel>
      )
    }
  })
}

export default registerConfig
