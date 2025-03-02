import { computed } from 'vue'
import type { Animation } from '@/types'
import { store } from '@/store'

export const useAnimation = () => {
  const selectedId = computed(() => store.selectedId)

  const prefixCls = 'animate__'
  const baseName = `${prefixCls}animated`

  const getFullAnimationName = (shortName) => prefixCls + shortName

  const filterAnimationCls = (el) => {
    el.classList.value = el.classList.value
      .split(' ')
      .filter((item) => !item.includes(prefixCls))
      .join(' ')
  }

  const setAnimation = (el, animation) => {
    filterAnimationCls(el)
    el.style.setProperty('--animate-duration', `${animation.duration}s`)
    el.style.setProperty('animation-delay', `${animation.delay}s`)
    el.style.setProperty('animation-iteration-count', `${animation.infinite ? 'infinite' : animation.count}`)
    el.classList.add(baseName, getFullAnimationName(animation.value))
  }

  const getElementById = (id) => {
    return document.querySelector(`[_componentid="${id}"]`)
  }

  const play = (animates: Animation[], index = 0) => {
    if (index >= animates.length) {
      return
    }
    const animation = animates[index]
    const el = getElementById(selectedId.value)
    animation.playing = true
    const animationEnd = (event?: AnimationEvent) => {
      event?.stopPropagation()
      el.classList.remove(baseName, getFullAnimationName(animation.value))
      el.removeEventListener('animationend', animationEnd)
      animation.playing = false
      setTimeout(() => {
        play(animates, index + 1)
      })
    }

    setAnimation(el, animation)
    el.addEventListener('animationend', animationEnd, { once: true })
  }

  const pause = (animates: Animation[]) => {
    animates.forEach((animate) => {
      animate.playing = false
    })
    const el = getElementById(selectedId.value)
    filterAnimationCls(el)
  }

  const hoverPlay = (el: HTMLElement, animation: Animation) => {
    filterAnimationCls(el)
    setAnimation(el, animation)
    const animationEnd = (event?: AnimationEvent) => {
      event?.stopPropagation()
      el.classList.remove(baseName, getFullAnimationName(animation.value))
      el.removeEventListener('animationend', animationEnd)
    }
    el.addEventListener('animationend', animationEnd, { once: true })
  }

  return {
    play,
    pause,
    hoverPlay
  }
}
