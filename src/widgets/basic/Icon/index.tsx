import { ElIcon } from 'element-plus'
import MapIcon from '@/icons/Map.vue'
import { defineComponent } from '@/widgets/utils/define'
import { genStyle } from '@/widgets/utils/style'
import { renderPreview } from '@/widgets/utils/render'
import * as Icons from '@element-plus/icons-vue'
import { genProps } from './props'

const registerInput = () => {
  return defineComponent({
    name: '图标',
    key: 'icon',
    group: 'basic',
    draggable: true,
    icon: () => <MapIcon />,
    props: genProps(),
    model: {},
    style: genStyle(),
    events: [],
    actions: [],
    preview: (component) => {
      return renderPreview({ icon: component.icon, name: component.name })
    },
    render: ({ props, model, style }) => {
      const Icon = Icons[props.icon]
      return (
        <ElIcon class={props.spin ? 'is-loading' : null} {...props} {...model} style={style}>
          <Icon />
        </ElIcon>
      )
    }
  })
}

export default registerInput
