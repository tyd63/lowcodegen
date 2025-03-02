<script lang="ts" setup>
  import MapIcon from '@/icons/Map.vue'
  import outlineIcon from '@/icons/Outline.vue'
  import { ref, computed } from 'vue'
  import Library from './Library.vue'
  import OutlineTree from './OutlineTree.vue'

  const tabs = [
    { title: '组件', Icon: MapIcon, Panel: Library },
    { title: '大纲树', Icon: outlineIcon, Panel: OutlineTree }
  ]

  const panelActiveIdx = ref(0)

  const handleTab = (idx) => {
    panelActiveIdx.value = idx
  }

  const activePanel = computed(() => tabs[panelActiveIdx.value]?.Panel)

  const handleClose = () => {
    panelActiveIdx.value = -1
  }
</script>

<template>
  <div class="lc-material">
    <div class="h-full w-[60px] flex-shrink-0 border-r border-r-[var(--el-border-color)] py-4 px-1">
      <div
        :class="[
          'flex flex-col items-center justify-center mb-5 last:mb-0 p-1 rounded-md hover:bg-[var(--el-fill-color-light)] hover:text-[var(--el-color-primary)] active:bg-[var(--el-fill-color-dark)] cursor-pointer transition-all',
          {
            'text-[var(--el-color-primary)]': panelActiveIdx === idx
          }
        ]"
        v-for="(item, idx) in tabs"
        :key="idx"
        @click="handleTab(idx)"
      >
        <el-icon>
          <component :is="item.Icon"></component>
        </el-icon>
        <div class="text-xs mt-2">{{ item.title }}</div>
      </div>
    </div>
    <component v-if="activePanel" style="width: calc(var(--lc-material-width) - 60px)" :is="activePanel" @close="handleClose"></component>
  </div>
</template>

<style lang="scss">
  .lc-material {
    display: flex;
    height: 100%;
    flex-shrink: 0;
    background-color: var(--el-bg-color);
  }
</style>
