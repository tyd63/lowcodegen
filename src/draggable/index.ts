import { comp2block } from '@/utils/comp2block'
import { createGhost, removeRef, dState } from './helper'
import { store } from '@/store'

const dragEvents = {
  dragenter(e: DragEvent) {
    e.stopPropagation()
    e.stopPropagation()
  },
  dragleave(e: DragEvent) {
    e.stopPropagation()
    e.stopPropagation()
  },
  dragover: (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'move'
    createGhost(e)
  },
  drop(e: DragEvent) {
    const { ghostEl } = dState
    if (!ghostEl) return
    const compStr = e.dataTransfer.getData('comp')
    const blockStr = e.dataTransfer.getData('block')
    const { blockId, slotKey, idx } = ghostEl.__state__
    if (compStr) {
      const compObj = JSON.parse(compStr)
      store.insetBlock(blockId, slotKey, comp2block(compObj), +idx)
    }
    if (blockStr) {
      const blockObj = JSON.parse(blockStr)
      store.insetBlock(blockId, slotKey, blockObj, +idx)
    }
    store.setDragging(false)
    requestAnimationFrame(() => {
      removeRef()
    })
  },
  dragend() {
    removeRef()
    store.setDragging(false)
  }
}

export const setupDraggable = () => {
  document.body.addEventListener('dragenter', dragEvents.dragenter)
  document.body.addEventListener('dragleave', dragEvents.dragleave)
  document.body.addEventListener('dragover', dragEvents.dragover)
  document.body.addEventListener('drop', dragEvents.drop)
  document.body.addEventListener('dragend', dragEvents.dragend)
}

export const removeDraggable = () => {
  document.body.removeEventListener('dragenter', dragEvents.dragenter)
  document.body.removeEventListener('dragleave', dragEvents.dragleave)
  document.body.removeEventListener('dragover', dragEvents.dragover)
  document.body.removeEventListener('drop', dragEvents.drop)
  document.body.removeEventListener('dragend', dragEvents.dragend)
}
