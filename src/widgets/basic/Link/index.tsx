import MapIcon from '@/icons/Map.vue'
import { defineComponent } from '@/widgets/utils/define'
import { genStyle } from '@/widgets/utils/style'
import { renderPreview } from '@/widgets/utils/render'
import { ElLink } from 'element-plus'
import { genProps } from './props'

const registerConfig = () => {
  return defineComponent({
    name: 'Link',
    key: 'link',
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
        <ElLink {...props} style={style}>
          {props.content}
        </ElLink>
      )
    }
  })
}

export default registerConfig
