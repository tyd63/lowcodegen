import type { CSSProperties, Ref } from 'vue'
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { isPage } from '@/utils/is'
import { store } from '@/store'
import { debounce, throttle } from 'lodash-es'

export const useBorders = (containerRef: Ref<HTMLElement>) => {
  const initialStyle: CSSProperties = {
    display: 'none'
  }

  const selectedBorderStyle = ref<CSSProperties>({ ...initialStyle })
  const selectedActionsStyle = ref<CSSProperties>({})
  const hoveredBorderStyle = ref<CSSProperties>({ ...initialStyle })
  const hoveredTextStyle = ref<CSSProperties>({})

  const selectedId = computed(() => store.selectedId)
  const hoverId = computed(() => store.hoverId)

  const getPosition = (el: HTMLElement) => {
    const { top: wrapTop, left: wrapLeft } = containerRef.value.getBoundingClientRect() as DOMRect
    const { width, height, top, left } = el.getBoundingClientRect() as DOMRect
    const scrollTop = containerRef.value.scrollTop
    const x = left - wrapLeft
    const y = top - wrapTop + scrollTop
    return {
      x,
      y,
      width,
      height
    }
  }

  const updateSelectedBorder = () => {
    const el = containerRef.value.querySelector(`[_componentid="${selectedId.value}"]`) as HTMLElement
    if (!el) {
      selectedBorderStyle.value = { ...initialStyle }
      return
    }

    el.ontransitionend = debounce(() => {
      updateSelectedBorder()
    }, 16)

    const { x, y, width, height } = getPosition(el)

    selectedBorderStyle.value = {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      height: `${height}px`,
      width: `${width}px`,
      border: '2px solid var(--el-color-primary)',
      zIndex: 2000,
      pointerEvents: 'none'
    }

    const actionsStyle = {
      position: 'absolute',
      zIndex: 2001,
      pointerEvents: 'auto'
    } as CSSProperties

    if (isPage(selectedId.value)) {
      actionsStyle.top = 0
      actionsStyle.right = 0
    } else {
      if (width < 110) {
        actionsStyle.left = 0
      } else {
        actionsStyle.right = 0
      }

      if (y < 20) {
        actionsStyle.bottom = 0
        actionsStyle.transform = `translateY(100%)`
      } else {
        actionsStyle.top = 0
        actionsStyle.transform = `translateY(-100%)`
      }
    }

    selectedActionsStyle.value = actionsStyle

    hoveredBorderStyle.value = initialStyle
  }

  const updateHoverBorder = () => {
    const el = containerRef.value.querySelector(`[_componentid="${hoverId.value}"]`) as HTMLElement

    if (store.isDragging || !el || (el && hoverId.value === selectedId.value)) {
      hoveredBorderStyle.value = initialStyle
      return
    }

    const { x, y, width, height } = getPosition(el)

    hoveredBorderStyle.value = {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      height: `${height}px`,
      width: `${width}px`,
      border: '1px dashed var(--el-color-primary)',
      zIndex: 19,
      pointerEvents: 'none'
    }

    hoveredTextStyle.value = {
      '--component-name': `"${el.getAttribute('_componentname')}"`,
      position: 'absolute',
      top: 0,
      left: 0,
      transform: `translateY(${y < 10 ? 0 : '-100%'})`,
      zIndex: 20,
      pointerEvents: 'none'
    }
  }

  watch(
    () => selectedId.value,
    () => {
      setTimeout(updateSelectedBorder, 16)
    }
  )

  watch(
    () => hoverId.value,
    () => {
      setTimeout(updateHoverBorder, 16)
    }
  )

  const scroll = throttle(() => {
    updateSelectedBorder()
  }, 10)

  const resize = throttle(() => {
    updateSelectedBorder()
  }, 100)

  let resizeOb: ResizeObserver
  onMounted(() => {
    containerRef.value.style.position = 'relative'
    containerRef.value?.addEventListener('scroll', scroll, { passive: true, capture: true })
    resizeOb = new ResizeObserver(resize)
    resizeOb.observe(containerRef.value)
  })

  onUnmounted(() => {
    containerRef.value?.removeEventListener('scroll', scroll)
    resizeOb.disconnect()
  })

  return {
    selectedBorderStyle,
    selectedActionsStyle,
    hoveredBorderStyle,
    hoveredTextStyle
  }
}
