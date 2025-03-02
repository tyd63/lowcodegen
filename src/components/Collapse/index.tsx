import { defineComponent, ref, Transition } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import type { TransitionProps } from 'vue'
import { ElIcon } from 'element-plus'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    defaultCollapse: {
      type: Boolean,
      default: false
    },
    freeze: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    const collapse = ref(props.defaultCollapse)

    const toggle = () => {
      if (props.freeze) return
      collapse.value = !collapse.value
    }

    const transitionProps: TransitionProps = {
      onBeforeEnter(el: HTMLElement) {
        if (!el) return
        el.style.height = '0'
        el.style.opacity = '0'
      },
      onEnter(el: HTMLElement) {
        if (!el) return
        el.style.transition = 'all 0.2s'
        el.style.height = `${el.scrollHeight}px`
        el.style.opacity = '1'
      },
      onAfterEnter(el: HTMLElement) {
        if (!el) return
        el.style.transition = 'inherit'
        el.style.height = ''
        el.style.opacity = ''
      },
      onBeforeLeave(el: HTMLElement) {
        if (!el) return
        el.style.height = `${el.scrollHeight}px`
        el.style.opacity = '1'
      },
      onLeave(el: HTMLElement) {
        if (!el) return
        el.style.transition = 'all 0.2s'
        el.style.height = '0'
        el.style.opacity = '0'
      },
      onAfterLeave(el: HTMLElement) {
        if (!el) return
        el.style.transition = 'inherit'
        el.style.height = ''
        el.style.opacity = ''
      }
    }

    return () => {
      return (
        <div class="lc-collapse border border-[var(--el-border-color)]">
          <div class="h-[32px] bg-[var(--el-fill-color)] flex items-center px-3 text-sm cursor-pointer select-none" onClick={() => toggle()}>
            <ElIcon>
              <ArrowRight class={['transition-all duration-200', collapse.value && 'rotate-90']} />
            </ElIcon>
            <div class="ml-2">{slots.title ? slots.title() : props.title}</div>
            {slots.extra ? <div class="ml-auto"> {slots.extra()}</div> : null}
          </div>

          <Transition {...transitionProps}>
            {collapse.value ? (
              <div>
                <div class="p-2">{slots.default?.()}</div>
              </div>
            ) : null}
          </Transition>
        </div>
      )
    }
  }
})
