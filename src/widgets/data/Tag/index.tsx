import { ElTag } from 'element-plus'
import ContainerIcon from '@/icons/Container.vue'
import { defineComponent } from '@/widgets/utils/define'
import { genStyle } from '@/widgets/utils/style'
import { genProps } from './props'
import { renderPreview } from '@/widgets/utils/render'

const registerConfig = () => {
  return defineComponent({
    name: '标签',
    key: 'tag',
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
    render: ({ props, style }) => {
      return (
        <ElTag {...props} style={style}>
          {props.content}
        </ElTag>
      )
    }
  })
}

export default registerConfig
