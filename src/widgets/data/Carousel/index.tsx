import { ElCarousel, ElCarouselItem } from 'element-plus'
import ContainerIcon from '@/icons/Container.vue'
import { defineComponent } from '@/widgets/utils/define'
import { genStyle } from '@/widgets/utils/style'
import { renderSlot } from '@/renderer/renderSlot'
import { genProps } from './props'
import { renderPreview } from '@/widgets/utils/render'
import { RenderWrapper } from '@/renderer/BlockRender/render-wrapper'

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
    children: {},
    preview: (component) => {
      return renderPreview({ icon: component.icon, name: component.name })
    },
    render: ({ props, children, id, style }) => {
      const renderItems = () => {
        const contents = []
        for (let i = 0; i < 5; i++) {
          contents.push(<ElCarouselItem>{renderSlot(id, `Slot${i + 1}`, children)}</ElCarouselItem>)
        }
        return contents
      }

      return (
        <ElCarousel {...props} style={style}>
          {renderItems}
        </ElCarousel>
      )
    }
  })
}

export default registerConfig
