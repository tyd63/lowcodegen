import PageIcon from '@/icons/Page.vue'
import { defineComponent } from './utils/define'
import { renderSlot } from '@/renderer/renderSlot'
import { genStyle } from '@/widgets/utils/style'

export const registerPageConfig = () => {
  return defineComponent({
    id: '@root',
    name: '页面',
    key: 'page',
    group: 'page',
    draggable: false,
    icon: () => <PageIcon />,
    props: {},
    model: {},
    style: genStyle(),
    events: [],
    actions: [],
    children: {
      default: []
    },
    render: ({ style, children, id }) => {
      return <div style={style}>{renderSlot(id, 'default', children)}</div>
    }
  })
}
