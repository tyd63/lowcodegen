import { ElImage } from 'element-plus'
import ContainerIcon from '@/icons/Container.vue'
import { defineComponent } from '@/widgets/utils/define'
import { genStyle } from '@/widgets/utils/style'
import { genProps } from './props'
import { renderPreview } from '@/widgets/utils/render'
import { omit } from 'lodash-es'

const registerConfig = () => {
  return defineComponent({
    name: '图片',
    key: 'image',
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
      return <ElImage {...omit(props, 'preview-src-list')} style={style}></ElImage>
    }
  })
}

export default registerConfig
