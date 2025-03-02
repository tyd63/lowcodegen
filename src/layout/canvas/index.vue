<script lang="ts" setup>
  import { store } from '@/store'
  import { computed, ref } from 'vue'
  import BlockRender from '@/renderer/BlockRender'
  import { useBorders } from '@/hooks/use-borders'
  import { useBlocksTree } from '@/hooks/use-blocks-tree'
  import { findBlockById, findNodePath } from '@/utils'
  import { Delete, CopyDocument, Lock } from '@element-plus/icons-vue'
  import { isPage } from '@/utils/is'

  const blocks = computed(() => store.globalData.blocks)
  const selectedId = computed(() => store.selectedId)

  const containerRef = ref<HTMLElement>()
  const { selectedBorderStyle, selectedActionsStyle, hoveredBorderStyle, hoveredTextStyle } = useBorders(containerRef)

  const { data } = useBlocksTree()
  const pathNodes = computed(() => findNodePath(data.value, selectedId.value).slice(0, -1).reverse())

  const curBlock = computed(() => findBlockById(blocks.value, selectedId.value))

  const ComponentIcon = computed(() => store.componentMap?.[curBlock.value?.key]?.icon || 'i')

  const componentName = computed(() => curBlock.value?.name)

  const tagNavigationVisible = ref(false)

  const setTagNavigationVisible = (status: boolean) => {
    tagNavigationVisible.value = status
  }

  const handleTag = (node) => {
    store.setSelectedId(node.id)
    setTagNavigationVisible(false)
  }

  const hoverTag = (node) => {
    if (node) {
      store.setHoverId(node.id)
    }
  }

  const handleCopy = () => {
    store.copyBlock(curBlock.value)
  }

  const handleDelete = () => {
    store.removeBlockById(curBlock.value.id)
  }
</script>

<template>
  <div class="lc-canvas">
    <div class="lc-canvas__container">
      <div class="lc-canvas__scroll" ref="containerRef">
        <div class="lc-canvas__blocks">
          <BlockRender v-for="block in blocks" :key="block.id" :block="block" :id="block.id" />
        </div>
        <div class="lc-selected-border" :style="selectedBorderStyle">
          <div class="flex items-center text-xs" :style="selectedActionsStyle">
            <div
              class="flex-shrink-0 relative"
              @mouseenter="setTagNavigationVisible(true)"
              @mouseleave="setTagNavigationVisible(false)"
              @mousemove="(e) => e.stopPropagation()"
            >
              <div class="h-[18px] flex items-center bg-[var(--el-color-primary)] text-white px-1 cursor-default">
                <el-icon :size="14" v-if="curBlock?.lock">
                  <Lock></Lock>
                </el-icon>
                <el-icon v-else :size="14">
                  <component :is="ComponentIcon"></component>
                </el-icon>
                <span class="ml-1 leading-none flex-shrink-0">
                  {{ componentName }}
                </span>
              </div>
              <transition name="slide-dynamic-origin">
                <div class="absolute left-0 top-full" v-if="tagNavigationVisible">
                  <div
                    class="h-[18px] flex items-center bg-[var(--el-overlay-color-lighter)] text-white px-1 mt-0.5 cursor-pointer w-max"
                    v-for="node in pathNodes"
                    :key="node.id"
                    @click="handleTag(node)"
                    @mouseenter="hoverTag(node)"
                    @mouseleave="hoverTag(null)"
                  >
                    <el-icon :size="14">
                      <component :is="node.icon"></component>
                    </el-icon>
                    <span class="ml-1 leading-none flex-shrink-0">
                      {{ node.label }}
                    </span>
                  </div>
                </div>
              </transition>
            </div>
            <div class="flex items-center ml-0.5 bg-[var(--el-color-primary)] text-white px-1 gap-x-0.5" v-if="!isPage(curBlock?.id)">
              <div class="h-[18px] flex items-center cursor-pointer" @click="handleCopy">
                <el-icon :size="14">
                  <CopyDocument />
                </el-icon>
              </div>
              <div class="h-[18px] flex items-center cursor-pointer" @click="handleDelete">
                <el-icon :size="14">
                  <Delete />
                </el-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="lc-hovered-border" :style="hoveredBorderStyle">
          <div :style="hoveredTextStyle">
            <span class="lc-hovered-txt"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .lc-canvas {
    height: 100%;
    flex: 1;
    overflow: hidden;

    &__container {
      box-sizing: border-box;
      padding: 20px;
      height: 100%;
      background-color: var(--el-bg-color-page);
      overflow: hidden;
    }

    &__scroll {
      overflow: overlay;
      width: 100%;
      height: 100%;
      background-color: var(--el-bg-color);
    }

    .lc-hovered-border {
      background-color: var(--el-color-primary-light-9);
      opacity: 0.5;

      .lc-hovered-txt {
        display: flex;
        line-height: 1;

        &::before {
          font-size: 12px;
          color: var(--el-color-primary);
          content: var(--component-name);
        }
      }
    }
  }
</style>
