import { ElIcon } from 'element-plus'
import { createElementVNode, createVNode } from 'vue'
export const renderPreview = ({ icon, name }) => {
  return createElementVNode(
    'div',
    {
      class: 'flex items-center gap-x-1 leading-none w-full'
    },
    [
      createVNode(
        ElIcon,
        { size: 16 },
        {
          default: () => createVNode(icon)
        }
      ),
      createElementVNode(
        'span',
        {
          class: 'text-xs whitespace-nowrap text-ellipsis overflow-hidden flex-1'
        },
        [name]
      )
    ]
  )
}
