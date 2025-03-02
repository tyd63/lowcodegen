import { computed, defineComponent, ref } from 'vue'
import Collapse from '@/components/Collapse'
import { useAnimation } from '@/hooks/use-animation'
import type { Animation } from '@/types'
import { Close, VideoPlay, VideoPause } from '@element-plus/icons-vue'
import { ElButton, ElForm, ElFormItem, ElIcon, ElSwitch } from 'element-plus'
import { getAnimateOptions } from './config'
import InputNumber from './InputNumber'
import { emitter } from '@/utils/emitter'

import './style.scss'

export default defineComponent({
  props: {
    draft: {
      type: Object,
      default: undefined
    }
  },
  setup(props) {
    const { play, pause, hoverPlay } = useAnimation()

    const animations = computed<Animation[]>(() => props.draft?.animations ?? [])

    const showAnimateOptionsPlane = ref(false)
    const animateRunning = computed(() => animations.value.some((animate) => animate.playing))

    const options = getAnimateOptions()

    const setAnimateOptionsPlane = (value) => {
      showAnimateOptionsPlane.value = value
    }
    const handleAddAnimate = (animate: Animation) => {
      setAnimateOptionsPlane(false)
      const origin = animations.value.slice()
      origin.push(animate)
      emitter.emit('updateDraft', { path: 'animations', value: origin })
    }

    const handleCancelAnimate = (e: MouseEvent, animate: Animation) => {
      e.stopPropagation()
      const origin = animations.value.slice()
      const index = origin.findIndex((item) => item.id === animate.id)
      if (~index) {
        origin.splice(index, 1)
        emitter.emit('updateDraft', { path: 'animations', value: origin })
        pause(animations.value)
      }
    }

    const handleAnimate = (e: MouseEvent, animate: Animation) => {
      e.stopPropagation()
      if (animate.playing) {
        pause([animate])
      } else {
        play([animate])
      }
    }

    const updateEvent = (index, prop) => {
      return (value) => emitter.emit('updateDraft', { path: `animations.${index}.${prop}`, value })
    }

    const renderAnimateList = () => {
      return (
        <>
          <div class="mb-3">
            <ElButton onClick={() => setAnimateOptionsPlane(true)}>添加动画</ElButton>
            <ElButton disabled={!animations.value?.length || animateRunning.value} onClick={() => play(animations.value)}>
              播放
            </ElButton>
          </div>
          {animations.value?.map((animate, index) => (
            <Collapse class="-mt-[1px]" default-collapse={true}>
              {{
                title() {
                  return (
                    <div class="flex items-center text-sm">
                      <div class="mr-3">动画{index + 1}</div>
                      <div class="text-[#999] mr-3">{animate.label}</div>
                      <ElIcon
                        class="cursor-pointer hover:text-[var(--el-color-primary)]"
                        size={16}
                        // @ts-ignore: click
                        onClick={(e) => handleAnimate(e, animate)}
                      >
                        {animate.playing ? <VideoPause /> : <VideoPlay />}
                      </ElIcon>
                    </div>
                  )
                },
                extra() {
                  return <ElButton icon={Close} link onClick={(e) => handleCancelAnimate(e, animate)}></ElButton>
                },
                default() {
                  return (
                    <ElForm class="lc-animate-form" label-width="40" label-position="left" inline>
                      <ElFormItem label="持续">
                        <InputNumber model-value={animate.duration} unit="s" onChange={updateEvent(index, 'duration')} />
                      </ElFormItem>
                      <ElFormItem label="延时">
                        <InputNumber model-value={animate.delay} unit="s" onChange={updateEvent(index, 'delay')} />
                      </ElFormItem>
                      <ElFormItem label="执行">
                        <InputNumber model-value={animate.count} step={1} onChange={updateEvent(index, 'count')} />
                      </ElFormItem>
                      <ElFormItem label="循环">
                        <ElSwitch model-value={animate.infinite} onChange={updateEvent(index, 'infinite')} />
                      </ElFormItem>
                    </ElForm>
                  )
                }
              }}
            </Collapse>
          ))}
        </>
      )
    }

    const renderOptions = () => {
      return (
        <>
          <div class="mb-3">
            <ElButton onClick={() => setAnimateOptionsPlane(false)}>动画列表</ElButton>
          </div>
          {options.map((item) => (
            <Collapse class="-mt-[1px]" title={item.label} key={item.value} default-collapse={false}>
              <div class="flex flex-wrap gap-2">
                {item.children.map((animation) => (
                  <div class="overflow-hidden" onClick={() => handleAddAnimate(animation)}>
                    <div
                      class="w-[90px] h-[48px] rounded cursor-pointer bg-[var(--el-fill-color-light)] text-xs flex items-center justify-center"
                      onMouseenter={(e) => hoverPlay(e.target as HTMLElement, animation)}
                    >
                      {animation.label}
                    </div>
                  </div>
                ))}
              </div>
            </Collapse>
          ))}
        </>
      )
    }

    const renderContent = () => {
      if (!showAnimateOptionsPlane.value) {
        return renderAnimateList()
      }

      return renderOptions()
    }

    return () => {
      return renderContent()
    }
  }
})
