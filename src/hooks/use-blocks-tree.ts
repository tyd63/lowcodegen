import { h, ref, watch } from 'vue'
import type { Block, Component, BlockChild } from '@/types'
import SlotIcon from '@/icons/Slot.vue'
import { store } from '@/store'

const isDefaultSlot = (children) => {
  return Object.keys(children).length === 1 && children.default
}

const transBlocksToTree = (blocks: Block[], componentMap: Record<string, Component>) => {
  const transBlockChildren = (children: BlockChild) => {
    if (!children) return
    return Object.keys(children)
      .map((slotKey) => {
        return {
          label: slotKey,
          id: `@slot_${slotKey}`,
          icon: () => h(SlotIcon),
          children: transBlocks(children[slotKey])
        }
      })
      .filter((child) => Object.keys(child.children).length)
  }

  const transBlocks = (blocks: Block[]) => {
    return blocks.map((block) => {
      return {
        label: block.name,
        id: block.id,
        key: block.key,
        hidden: block.style?.display === 'none',
        lock: block.lock,
        icon: componentMap[block.key].icon,
        children: isDefaultSlot(block.children) ? transBlocks(block.children.default) : transBlockChildren(block.children)
      }
    })
  }
  return transBlocks(blocks)
}

export const useBlocksTree = () => {
  const data = ref([])

  watch(
    () => store?.globalData?.blocks,
    (blocks) => {
      data.value = transBlocksToTree(blocks, store.componentMap)
    },
    { immediate: true, deep: true }
  )

  return {
    data
  }
}
