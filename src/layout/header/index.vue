<script lang="ts" setup>
  import DayIcon from '@/icons/Day.vue'
  import LightIcon from '@/icons/Light.vue'
  import SkinIcon from '@/icons/Skin.vue'
  import { $dialog } from '@/components/Dialog'
  import { codegen } from '@/codegen'

  import { useTheme } from '@/hooks/use-theme'
  import { store } from '@/store'
  import { ref } from 'vue'

  import { undoIcon, redoIcon } from '@/components/Icon'

  const { themeColor, themeColors, themeMode, changeThemeColor, changeThemeMode } = useTheme()

  const handleGlobalBlocks = () => {
    $dialog({
      loader: 'drawer',
      title: '全局节点',
      content: JSON.stringify(store.globalData.blocks, null, 2),
      readonly: true
    })
  }

  const codeGenLoading = ref(false)

  const handleCodegen = async () => {
    codeGenLoading.value = true
    const code = await codegen()
    codeGenLoading.value = false
    $dialog({
      loader: 'drawer',
      content: code,
      language: 'html',
      width: '90%',
      title: '代码已生成'
    })
  }

  const undo = () => {
    store.undo()
  }

  const redo = () => {
    store.redo()
  }
</script>

<template>
  <div class="lc-header">
    <div class="font-bold">低代码平台</div>
    <div class="flex items-center">
      <div class="flex mr-5">
        <el-button-group class="mr-4">
          <el-button @click="undo">
            <undoIcon />
            撤销
          </el-button>
          <el-button @click="redo"
            >恢复
            <redoIcon />
          </el-button>
        </el-button-group>

        <el-button @click="handleGlobalBlocks">全局节点</el-button>
        <el-button type="primary" @click="handleCodegen" :loading="codeGenLoading">生成代码</el-button>
      </div>

      <el-switch
        :model-value="themeMode"
        inline-prompt
        :active-icon="DayIcon"
        :inactive-icon="LightIcon"
        active-value="dark"
        inactive-value="light"
        @change="changeThemeMode"
      />
      <div class="flex items-center gap-x-3 ml-4">
        <el-dropdown>
          <el-icon class="outline-none" :size="20" color="var(--el-color-primary)">
            <SkinIcon />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="theme in themeColors"
                :key="theme.color"
                :class="[themeColor == theme.themeColor ? '!bg-[var(--el-color-primary)] !text-white' : 'hover:!bg-transparent']"
                @click="changeThemeColor(theme)"
              >
                <div class="flex items-center gap-x-2">
                  <div class="w-[16px] h-[16px] flex items-center justify-center" :style="{ backgroundColor: theme.color }">
                    <el-icon v-if="themeColor === theme.themeColor" class="!mr-0" color="#fff" size="{16}">
                      <Check />
                    </el-icon>
                  </div>
                  <span>{{ theme.label }}</span>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .lc-header {
    height: var(--lc-header-height);
    border-bottom: 1px solid var(--el-border-color);
    display: flex;
    flex-shrink: 0;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    background-color: var(--el-bg-color);
  }
</style>
