import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import RenderBlock from './BlockRender'
import { Block } from '@/types'
import './Slot.scss'
import { store } from '@/store'

export default defineComponent({
  props: {
    blocks: {
      type: Object as PropType<Block[]>
    },
    slotKey: {
      type: String
    },
    id: {
      type: String,
      default: undefined
    },
    empty: {
      type: String,
      default: '组件拖拽到这里'
    }
  },
  setup(props) {
    const isEmpty = computed(() => props.blocks.length === 0)

    const cls = computed(() => ['lc-slot', isEmpty.value && 'is-empty', store.isDragging && 'is-dragging'])

    return () => {
      if (store.isDragging || !props.blocks.length) {
        return (
          <div class={cls.value} data-role="Slot" data-slot-key={props.slotKey} data-block-id={props.id} data-empty={props.empty}>
            {props.blocks.map((block) => (
              <RenderBlock block={block} key={block.id} id={block.id} />
            ))}
          </div>
        )
      }
      return (
        <>
          {props.blocks.map((block) => (
            <RenderBlock block={block} key={block.id} id={block.id} />
          ))}
        </>
      )
    }
  }
})
