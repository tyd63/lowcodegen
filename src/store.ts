import { nextTick, reactive } from 'vue'
import type { Block, Component, GlobalData } from './types'
import { defaultGlobalData, findBlockById, findBlockParentById, traverse } from './utils'
import { cloneDeep } from 'lodash-es'
import { uid } from 'uid'

interface State {
  globalData: GlobalData
  components: Component[]
  componentMap: Record<string, Component>
  selectedId: string | null
  isDragging: boolean
  hoverId: string
  history: {
    current: number
    records: Block[]
  }
}

const state: State = {
  globalData: defaultGlobalData(),
  components: [],
  componentMap: {},
  selectedId: null,
  hoverId: null,
  isDragging: false,
  history: {
    current: -1,
    records: []
  }
}

const actions = {
  addHistory() {
    const snapshot = cloneDeep(this.globalData.blocks)
    this.history.current += 1
    this.history.records[this.history.current] = snapshot
    this.history.records.length = this.history.current + 1
  },
  redo() {
    if (this.history.current < this.history.records.length - 1) {
      this.history.current += 1
      const blocks = this.history.records[this.history.current]
      if (blocks) {
        this.globalData.blocks = cloneDeep(blocks)
        this.setSelectedId(null)
      }
    }
  },
  undo() {
    if (this.history.current > -1) {
      this.history.current -= 1
      const blocks = this.history.records[this.history.current]
      this.globalData.blocks = cloneDeep(blocks) ?? defaultGlobalData().blocks

      this.setSelectedId(null)
    }
  },
  // 拖拽 在合适的位置插入 block
  insetBlock(id, slotKey, block, idx = 0) {
    const blocks = this.globalData.blocks
    const curBlock = findBlockById(blocks, id)
    let slotBlocks = curBlock.children[slotKey]
    if (!slotBlocks) {
      slotBlocks = curBlock.children[slotKey] = []
    }
    slotBlocks.splice(idx, 0, block)
    this.setSelectedId(block.id)

    this.addHistory()
  },
  removeBlockById(id: string) {
    const blocks = this.globalData.blocks
    const { parent, slotKey } = findBlockParentById(blocks, id)
    const slotChildren = parent.children?.[slotKey] ?? []
    const idx = slotChildren.findIndex((b) => b.id === id)
    if (~idx) {
      const block = slotChildren.splice(idx, 1)[0]
      this.setSelectedId(null)
      this.addHistory()
      return {
        block,
        parentId: parent.id,
        slotKey,
        idx
      }
    }
  },
  copyBlock(block: Block) {
    const _block = cloneDeep(block)
    const blocks = this.globalData.blocks
    const { parent, slotKey } = findBlockParentById(blocks, _block.id)
    traverse([_block], (node) => {
      node.id = `${uid()}`
    })
    const idx = parent.children[slotKey].findIndex((b) => b.id === block.id)
    parent.children[slotKey].splice(idx + 1, 0, _block)
    this.setSelectedId(_block.id)

    this.addHistory()
  },
  // 更新block属性
  async updateBlock({ id, path, value, block = undefined }) {
    console.log('updateBlock', id, path, value)
    const curBlock = block ?? this.getBlockById(id)
    const copyBlock = cloneDeep(curBlock)
    const propKeys = path.split('.')
    const lastIdx = propKeys.length - 1
    propKeys.reduce((result, prop, idx) => {
      if (result[prop] == null) {
        result[prop] = {}
      }
      if (lastIdx === idx) {
        result[prop] = value
      }
      return result[prop]
    }, copyBlock)

    Object.assign(curBlock, copyBlock)
    this.setSelectedId('')
    await nextTick()
    this.setSelectedId(id)

    this.addHistory()
  },
  updateComponents(components: Component[], map: Record<string, Component>) {
    this.components = components
    this.componentMap = map
  },
  setSelectedId(id: string | null) {
    this.selectedId = id
  },
  setDragging(isDragging: boolean) {
    if (isDragging) {
      this.setSelectedId(null)
    }
    this.isDragging = isDragging
  },
  setHoverId(id: string | null) {
    this.hoverId = id
  },
  getBlockById(id: string | null) {
    if (!id) return null
    return findBlockById(this.globalData.blocks, id)
  }
}

export const store = reactive<typeof actions & State>(Object.assign({}, state, actions))

const bindActionsThis = () => {
  Object.keys(store).forEach((key) => {
    const method = state[key]
    if (typeof method === 'function') {
      store[key] = function (...args) {
        return method.apply(store, args)
      }
    }
  })
}
bindActionsThis()

// @ts-ignore
window._store = store
