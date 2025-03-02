import type { Block, GlobalData } from '@/types'
import { cloneDeep } from 'lodash-es'
import { getRootBlock } from './comp2block'

export const findNodePath = (nodes = [], id: string) => {
  let path = []
  const find = (nodes, parent) => {
    nodes.some((node) => {
      node.path = parent?.path ? parent.path.concat([node]) : [node]
      if (node.id === id) {
        path = node.path
        return true
      }
      if (node.children) {
        find(node.children, node)
      }
    })
  }

  find(cloneDeep(nodes), null)
  return path
}

export const defaultGlobalData = (globalData?: GlobalData): GlobalData => {
  return Object.assign(
    {
      blocks: [getRootBlock()]
    },
    globalData
  )
}

export const traverse = (blocks: Block[], visitor) => {
  const stack = [...blocks]
  let _break = false
  while (stack.length) {
    if (_break) break
    const node = stack.shift()
    visitor(node!, () => {
      _break = true
    })
    const children = node?.children
    if (children) {
      const slotKeys = Object.keys(children)
      for (let i = 0; i < slotKeys.length; i++) {
        const blocks = children[slotKeys[i]]
        if (blocks) {
          for (let j = blocks.length - 1; j >= 0; j--) {
            stack.unshift(blocks[j])
          }
        }
      }
    }
  }
}
export const findBlockById = (blocks: Block[], id: string): Block => {
  let target = null
  traverse(blocks, (block, done) => {
    if (block.id === id) {
      target = block
      done()
    }
  })
  return target
}
export const findBlockParentById = (blocks: Block[], id: string): { parent: Block; slotKey: string } => {
  let parent = null
  let slotKey = 'default'
  const find = (blocks, _parent, _slotKey) => {
    blocks.some((block) => {
      if (block.id === id && !parent) {
        parent = _parent
        slotKey = _slotKey
        return true
      }
      if (block.children) {
        Object.keys(block.children).forEach((slotKey) => {
          find(block.children[slotKey] ?? [], block, slotKey)
        })
      }
    })
  }
  find(blocks, null, 'default')

  return {
    parent,
    slotKey
  }
}
