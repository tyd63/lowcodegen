import PageIcon from '@/icons/Page.vue'
import { defineComponent } from './utils/define'
import { renderSlot } from '@/renderer/renderSlot'

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
    style: {},
    events: [],
    actions: [],
    children: {
      default: []
    },
    render: ({ children, id }) => {
      return <div>{renderSlot(id, 'default', children)}</div>
    }
  })
}
