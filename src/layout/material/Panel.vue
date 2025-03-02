<script lang="ts" setup>
  import { Close } from '@element-plus/icons-vue'
  defineProps({
    title: {
      type: String,
      default: undefined
    }
  })
  defineEmits(['close'])
</script>
<template>
  <div class="h-full flex-1 border-r border-r-[var(--el-border-color)] flex flex-col overflow-hidden">
    <div class="h-[40px] flex-shrink-0 flex items-center justify-between px-3 text-sm font-bold border-b border-b-[var(--el-border-color)]">
      <slot name="title">{{ title }}</slot>
      <el-icon class="cursor-pointer hover:text-[var(--el-color-primary)]" @click="$emit('close')">
        <Close />
      </el-icon>
    </div>
    <div class="pl-2 pb-2 pt-1 flex-1 overflow-hidden">
      <el-scrollbar class="pr-2">
        <slot></slot>
      </el-scrollbar>
    </div>
  </div>
</template>
