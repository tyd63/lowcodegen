import MapIcon from '@/icons/Map.vue'
import { defineComponent } from '@/widgets/utils/define'
import { genStyle } from '@/widgets/utils/style'
import { renderPreview } from '@/widgets/utils/render'
import { ElText } from 'element-plus'
import { genProps } from './props'

const register = () => {
  return defineComponent({
    name: '文本',
    key: 'text',
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
    render: ({ props, style }) => {
      return (
        <ElText {...props} style={style}>
          {props.content}
        </ElText>
      )
    }
  })
}

export default register
