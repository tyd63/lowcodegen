import { ElRate } from 'element-plus'
import MapIcon from '@/icons/Map.vue'
import { defineComponent } from '@/widgets/utils/define'
import { genStyle } from '@/widgets/utils/style'
import { renderPreview } from '@/widgets/utils/render'
import { createInputProp } from '@/widgets/utils/props'
import { genProps } from './props'
import { RenderWrapper } from '@/renderer/BlockRender/render-wrapper'

const registerConfig = () => {
  return defineComponent({
    name: '评分',
    key: 'rate',
    group: 'form',
    draggable: true,
    icon: () => <MapIcon />,
    props: genProps(),
    model: {
      modelValue: createInputProp({ label: 'v-model', value: 'rate' })
    },
    style: genStyle(),
    events: [],
    actions: [],
    preview: (component) => {
      return renderPreview({ icon: component.icon, name: component.name })
    },
    render: ({ props, model, style }) => {
      return (
        <RenderWrapper styles={style}>
          <ElRate {...props} {...model}></ElRate>
        </RenderWrapper>
      )
    }
  })
}

export default registerConfig
