<script lang="ts" setup>
  import Panel from './Panel.vue'
  import { ref, computed } from 'vue'
  import { store } from '@/store'

  import Material from '@/renderer/Material'
  import { toRaw } from 'vue'

  defineEmits(['close'])

  const activeName = ref(['basic', 'form', 'data', 'other'])

  const components = computed(() => store.components)

  console.log('components', toRaw(components.value))

  const collapseItems = [
    {
      title: '基础组件',
      name: 'basic',
      components: components.value?.filter((component) => component.group === 'basic')
    },
    {
      title: '表单组件',
      name: 'form',
      components: components.value?.filter((component) => component.group === 'form')
    },
    {
      title: '数据',
      name: 'data',
      components: components.value?.filter((component) => component.group === 'data')
    },
    {
      title: '其他',
      name: 'other',
      components: components.value?.filter((component) => component.group === 'other')
    }
  ]
</script>

<template>
  <Panel title="组件" @close="$emit('close')">
    <el-collapse v-model="activeName" class="border-t-0">
      <el-collapse-item v-for="item in collapseItems" :key="item.name" :name="item.name">
        <template #title>
          <span>{{ item.title }}</span>
        </template>
        <div class="flex flex-wrap gap-2">
          <Material :class="['lc-component', { 'is-disabled': !comp.draggable }]" v-for="comp in item.components" :key="comp.id" :comp="comp">
            <component :is="comp.preview(comp)"></component>
          </Material>
        </div>
      </el-collapse-item>
    </el-collapse>
  </Panel>
</template>

<style lang="scss">
  .lc-component {
    display: flex;
    align-items: center;
    border: 1px dashed transparent;
    border-radius: 8px;
    padding-right: 2px;
    padding-left: 12px;
    width: 106px;
    height: 36px;
    font-size: 12px;
    background-color: var(--el-color-primary-light-9);
    box-sizing: border-box;
    cursor: move;

    &.is-disabled {
      cursor: not-allowed;
      user-select: none;
      display: none;
    }

    &:hover:not(.is-disabled) {
      border-color: var(--el-color-primary);
    }
  }
</style>
