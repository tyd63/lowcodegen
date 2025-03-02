<script lang="ts" setup>
  import { computed } from 'vue'
  import Panel from './Panel.vue'
  import { ArrowRight, Delete, View, Hide, Lock, Unlock } from '@element-plus/icons-vue'
  import { isSlot, isPage } from '@/utils/is'
  import { useBlocksTree } from '@/hooks/use-blocks-tree'
  import { store } from '@/store'

  defineEmits(['close'])

  const { data } = useBlocksTree()

  const indent = 10
  const activeId = computed({
    get() {
      return store.selectedId
    },
    set(id) {
      store.setSelectedId(id)
    }
  })

  const renderIcon = (node) => {
    return node.data.icon()
  }

  const toggleLock = (id) => {
    const curBlock = store.getBlockById(id)
    store.updateBlock({ id, path: 'lock', value: !curBlock.lock, block: curBlock })
  }

  const toggleHidden = (id) => {
    const curBlock = store.getBlockById(id)
    const value = curBlock.style.display === 'none' ? '' : 'none'
    store.updateBlock({ id, path: 'style.display', value, block: curBlock })
  }

  const handleDelete = (id, e: MouseEvent) => {
    e.stopPropagation()
    store.removeBlockById(id)
  }

  const handleNode = (data) => {
    const id = data.id
    store.setSelectedId(id)
  }

  const getSlotTitleStyle = (node) => {
    const left = (node.level - 1) * indent + 'px'
    return {
      left,
      width: `calc(100% - ${left})`
    }
  }

  const getSlotLineStyle = (node) => {
    return {
      left: (node.level - 1) * indent + 'px'
    }
  }
</script>

<template>
  <Panel title="大纲树" @close="$emit('close')">
    <el-tree
      class="lc-outline-tree"
      :key="activeId"
      :current-node-key="activeId"
      :indent="indent"
      :data="data"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      highlight-current
      :icon="ArrowRight"
      @node-click="handleNode"
    >
      <template #default="{ node }">
        <div class="lc-tree-node flex w-full items-center justify-between pr-2 text-[#666] select-none">
          <div class="flex items-center">
            <el-icon>
              <component :is="renderIcon(node)"></component>
            </el-icon>
            <span class="text-xs ml-1.5">{{ node.data.label }}</span>
          </div>
          <div class="lc-tree-node-actions flex items-center gap-x-1">
            <template v-if="!isSlot(node.data.id) && !isPage(node.data.id)">
              <el-tooltip :content="node.data.lock ? '解锁' : '锁定'" placement="top" :enterable="false" :hide-after="50" :offset="8">
                <el-Icon :class="[node.data.lock ? 'unlock' : 'lock']" @click="(e) => toggleLock(node.data.id)">
                  <component :is="node.data.lock ? Lock : Unlock"></component>
                </el-Icon>
              </el-tooltip>

              <el-tooltip :content="node.data.hidden ? '显示' : '隐藏'" placement="top" :enterable="false" :hide-after="50" :offset="8">
                <el-icon :class="[node.data.hidden ? 'view' : 'hide']" @click="(e) => toggleHidden(node.data.id)">
                  <component :is="node.data.hidden ? View : Hide"></component>
                </el-icon>
              </el-tooltip>

              <el-tooltip content="删除" placement="top" :enterable="false" :hide-after="50" :offset="8">
                <el-icon class="delete" @click="(e) => handleDelete(node.data.id, e)">
                  <component :is="Delete"></component>
                </el-icon>
              </el-tooltip>
            </template>
          </div>
        </div>
        <template v-if="isSlot(node.data.id)">
          <div class="lc-outline-slot-line" :style="getSlotLineStyle(node)"></div>
          <div class="lc-outline-slot-title" :style="getSlotTitleStyle(node)">
            <span class="lc-outline-slot-txt">插槽</span>
          </div>
        </template>
      </template>
    </el-tree>
  </Panel>
</template>

<style lang="scss">
  .lc-outline-tree {
    .el-tree-node[data-key^='@slot'] {
      position: relative;

      > .el-tree-node__content {
        background-color: transparent !important;

        &:hover {
          cursor: not-allowed;
        }
      }

      &::before {
        content: ' ';
        display: block;
        height: 13px;
        background-color: transparent;
      }

      .lc-outline-slot-line {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        display: block;
        border-left: 1px solid var(--el-color-primary);
        width: 0;
        height: 100%;
      }

      .lc-outline-slot-title {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 4;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 13px;
        background-color: var(--el-color-primary);

        .lc-outline-slot-txt {
          font-size: 12px;
          color: #fff;
          line-height: 1;
          transform: scale(0.82);
        }
      }
    }

    .lc-tree-node:hover {
      .lock {
        visibility: visible;
      }

      .hide {
        visibility: visible;
      }

      .delete {
        visibility: visible;
      }
    }

    .lock {
      color: #aaa;
      visibility: hidden;

      &:hover {
        color: #666;
      }
    }

    .unlock {
      color: #666;
    }

    .hide {
      color: #aaa;
      visibility: hidden;

      &:hover {
        color: #666;
      }
    }

    .view {
      color: #666;
    }

    .delete {
      color: #aaa;
      visibility: hidden;

      &:hover {
        color: #666;
      }
    }
  }
</style>
