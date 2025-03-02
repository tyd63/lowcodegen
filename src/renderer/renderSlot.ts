import { createVNode } from 'vue'
import Slot from './Slot'
import { BlockChild } from '@/types'

export const renderSlot = (id: string, slotKey: string, children: BlockChild) => {
  const blocks = children[slotKey]
  if (blocks) {
    return createVNode(Slot, {
      id,
      blocks,
      slotKey
    })
  }
  if (!blocks) {
    const newBlocks = (children[slotKey] = [])
    return createVNode(Slot, {
      id,
      blocks: newBlocks,
      slotKey
    })
  }
}
