import { createImage } from '@/draggable/helper'
import { store } from '@/store'
import type { Component } from '@/types'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  props: {
    comp: {
      type: Object as PropType<Component>,
      default: undefined
    }
  },
  setup(props, { slots }) {
    const dragEvents = {
      draggable: props.comp.draggable,
      ondragstart(e: DragEvent) {
        e.dataTransfer.setData('comp', JSON.stringify(props.comp))
        createImage(e, props.comp.name)
        store.setDragging(true)
      }
    }

    return () => {
      return <div {...dragEvents}>{slots.default?.()}</div>
    }
  }
})
