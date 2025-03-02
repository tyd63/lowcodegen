import { computed, createVNode, defineComponent } from 'vue'
import type { PropType, VNodeProps } from 'vue'
// import MoveIcon from '@/icons/Move.vue'
// import { ElIcon } from 'element-plus'
// import { isPage } from '@/utils/is'
import { genPureProps, genPureStyle, genPureModel } from './render-helper'
import { Block, Data } from '@/types'
import { store } from '@/store'
import { createImage } from '@/draggable/helper'
import { useContext } from '@/hooks/use-context'

import './style.scss'

export default defineComponent({
  props: {
    block: {
      type: Object as PropType<Block>,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { context } = useContext()
    const component = store.componentMap?.[props.block.key]

    const isDragging = computed(() => store.isDragging)

    const dragEvents = {
      draggable: props.block.draggable,
      ondragstart(e: DragEvent) {
        e.stopPropagation()
        e.dataTransfer.setData('block', JSON.stringify(props.block))
        createImage(e, props.block.name)
        setTimeout(() => {
          store.removeBlockById(props.id)
          store.setDragging(true)
        }, 0)
      }
    }

    const setSelectedId = (e: MouseEvent) => {
      e.stopPropagation()
      store.setSelectedId(props.block.id)
    }

    return () => {
      const componentRender = component.render({
        model: genPureModel(props.block, context.formData),
        children: props.block.children,
        props: genPureProps(props.block),
        style: genPureStyle(props.block),
        id: props.id
      })

      const vNodeProps: VNodeProps & Data = {
        'data-role': 'Block',
        'data-dragging': isDragging.value,
        _componentname: props.block.name,
        _componentid: props.block.id,
        _componentkey: props.block.key,
        ...dragEvents,
        onmousedown: setSelectedId,
        onmouseenter: () => {
          store.setHoverId(props.block.id)
        },
        onmouseleave: () => {
          store.setHoverId(null)
        }
      }
      return createVNode(componentRender, vNodeProps)
    }
  }
})
