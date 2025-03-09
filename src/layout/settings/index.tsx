import { defineComponent, computed, ref, watch, onUnmounted } from 'vue'
import { ElScrollbar, ElTabs, ElTabPane, ElDivider } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { store } from '@/store'
import { emitter } from '@/utils/emitter'

import type { Block } from '@/types'
import { isPage } from '@/utils/is'
import Breadcrumbs from './Breadcrumbs'

import Props from './Props'
import Styles from './Styles'
import Animation from './Animation'

import './style.scss'

export default defineComponent({
  setup() {
    const isDragging = computed(() => store.isDragging)

    const draft = ref<Block>()

    watch(
      () => store.selectedId,
      (id) => {
        const curBlock = store.getBlockById(id)
        if (curBlock) {
          draft.value = cloneDeep(curBlock)
        }
      },
      { immediate: true }
    )

    const component = computed(() => store.componentMap[draft.value?.key])

    const updateDraft = ({ path, value }) => {
      store.updateBlock({ id: draft.value.id, path, value })
    }

    emitter.on('updateDraft', updateDraft)

    onUnmounted(() => {
      emitter.off('updateDraft', updateDraft)
    })

    const renderContent = () => {
      if (isDragging.value) {
        return <div class="flex justify-center text-xs pt-10 text-[#999]">拖拽中...</div>
      }
      if (!draft.value) {
        return <div class="flex justify-center text-xs pt-10 text-[#999]">请在画布选中节点</div>
      }

      if (draft.value?.lock) {
        return <div class="flex justify-center text-xs pt-10 text-[#999]">节点已被锁住,无法编辑</div>
      }

      // if (isPage(draft.value?.id)) {
      //   return (
      //     <>
      //       <Breadcrumbs />
      //       <ElDivider>
      //         <span class="text-xs text-[#999] font-normal">属性</span>
      //       </ElDivider>
      //     </>
      //   )
      // }
      return (
        <>
          <Breadcrumbs />
          <ElTabs class="lc-tabs">
            <ElScrollbar>
              <ElTabPane label="属性">
                <Props draft={draft.value} component={component.value} />
              </ElTabPane>
              <ElTabPane label="样式">
                <Styles draft={draft.value} component={component.value} />
              </ElTabPane>
              <ElTabPane label="动画">
                <Animation draft={draft.value} />
              </ElTabPane>
            </ElScrollbar>
          </ElTabs>
        </>
      )
    }

    return () => {
      return (
        <div class="lc-settings" key={draft.value?.id}>
          {renderContent()}
        </div>
      )
    }
  }
})
