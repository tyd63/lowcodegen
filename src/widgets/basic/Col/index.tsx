import { ElCol } from 'element-plus'
import ContainerIcon from '@/icons/Container.vue'
import { defineComponent } from '@/widgets/utils/define'
import { genStyle } from '@/widgets/utils/style'
import { renderSlot } from '@/renderer/renderSlot'
import { createInputNumberProp } from '@/widgets/utils/props'
import { renderPreview } from '@/widgets/utils/render'

const registerConfig = (option: { span?: number; sort?: number } = {}) => {
  const { span = 12, sort = 0 } = option
  return defineComponent({
    name: 'Col',
    key: 'col',
    group: 'basic',
    draggable: true,
    icon: () => <ContainerIcon />,
    props: {
      span: createInputNumberProp({ label: '占位格数', value: span, min: 1, max: 24 }),
      offset: createInputNumberProp({ label: '左侧间隔', value: 0, min: 0, max: 24 }),
      push: createInputNumberProp({ label: '向右格数', value: 0, min: 0, max: 24 }),
      pull: createInputNumberProp({ label: '向左格数', value: 0, min: 0, max: 24 }),
      sort: createInputNumberProp({ label: '栅格顺序', value: sort, min: 0, max: 99 })
    },
    model: {},
    style: genStyle(),
    events: [],
    actions: [],
    preview: (component) => {
      return renderPreview({ icon: component.icon, name: component.name })
    },
    render: ({ props, children, id }) => {
      return <ElCol {...props}>{renderSlot(id, 'default', children)}</ElCol>
    }
  })
}

export default registerConfig
