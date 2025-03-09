<script setup lang="ts">
  import { onUnmounted, provide, reactive, ref } from 'vue'
  import Header from './layout/header/index.vue'
  import Material from './layout/material/index.vue'
  import Canvas from './layout/canvas/index.vue'
  import Settings from './layout/settings'
  import { registerComponents } from './widgets'
  import { editorInjectionKey } from './context'
  import { setupDraggable, removeDraggable } from '@/draggable'

  import { store } from '@/store'
  import { onMounted } from 'vue'
  import { useKeyboard } from './hooks/use-keyboard'

  // 注册组件
  const { componentMap, components } = registerComponents()

  store.updateComponents(components, componentMap)

  const formData = ref({})

  provide(
    editorInjectionKey,
    reactive({
      formData
    })
  )

  useKeyboard('[ctrlKey,metaKey]+z', () => {
    store.undo()
  })
  useKeyboard('[ctrlKey,metaKey]+y', () => {
    store.redo()
  })

  onUnmounted(() => {
    removeDraggable()
  })

  onMounted(() => {
    setupDraggable()
  })
</script>

<template>
  <div class="lc-editor lc-editor-var">
    <Header />
    <div class="lc-main">
      <Material />
      <Canvas />
      <Settings />
    </div>
  </div>
</template>

<style lang="scss">
  .lc-editor {
    height: inherit;
    display: flex;
    flex-direction: column;
  }

  .lc-main {
    display: flex;
    flex: 1;
    overflow: hidden;
  }
</style>
