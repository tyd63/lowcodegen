import { computed, defineComponent } from 'vue'
import { findNodePath } from '@/utils'
import { isSlot } from '@/utils/is'
import { useBlocksTree } from '@/hooks/use-blocks-tree'
import { ElIcon } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'
import { store } from '@/store'
import './style.scss'

export default defineComponent({
  setup() {
    const { data } = useBlocksTree()
    const selectedId = computed(() => store.selectedId)

    const pathNodes = computed(() => findNodePath(data.value, selectedId.value).slice(-3))

    const unClickable = (id) => {
      return isSlot(id) || id === selectedId.value
    }

    const handleNode = (node) => {
      const id = node.id
      if (unClickable(id)) return
      store.setSelectedId(id)
    }

    const setHoveredId = (id) => {
      store.setHoverId(id)
    }

    const renderContent = () => {
      const content = []
      const le = pathNodes.value.length
      pathNodes.value.forEach((node, index) => {
        content.push(
          <>
            <span
              class={['flex items-center gap-x-1 text-[#666]', !unClickable(node.id) && 'cursor-pointer hover:text-[var(--el-color-primary)]']}
              onClick={() => handleNode(node)}
              onMouseenter={() => setHoveredId(node.id)}
              onMouseleave={() => setHoveredId(null)}
            >
              <ElIcon size={14}>{node.icon()}</ElIcon>
              <span class="text-xs">{node.label}</span>
            </span>
            {index !== le - 1 && (
              <ElIcon class="text-[#666] mx-2 text-xs">
                <ArrowRight />
              </ElIcon>
            )}
          </>
        )
      })

      return content
    }

    return () => {
      return <div class="lc-breadcrumbs">{renderContent()}</div>
    }
  }
})
