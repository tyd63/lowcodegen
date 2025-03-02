import { defineComponent } from 'vue'
import RadioButtons from '@/components/RadioButtons'

import { ElIcon } from 'element-plus'
import { getValue, setValue } from '../../utils'

import FlexStartIcon from './icons/FlexStart.vue'
import FlexEndIcon from './icons/FlexEnd.vue'
import CenterIcon from './icons/Center.vue'
import SpaceBetweenIcon from './icons/SpaceBetween.vue'
import SpaceAround from './icons/SpaceAround.vue'

export default defineComponent({
  props: {
    model: {
      type: Object,
      default: undefined
    }
  },
  setup(props) {
    const options = [
      {
        value: 'flex-start',
        tooltip: '左对齐',
        render() {
          return (
            <ElIcon>
              <FlexStartIcon />
            </ElIcon>
          )
        }
      },
      {
        value: 'flex-end',
        tooltip: '右对齐',
        render() {
          return (
            <ElIcon>
              <FlexEndIcon />
            </ElIcon>
          )
        }
      },
      {
        value: 'center',
        tooltip: '水平居中',
        render() {
          return (
            <ElIcon>
              <CenterIcon />
            </ElIcon>
          )
        }
      },
      {
        value: 'space-between',
        tooltip: '两端对齐',
        render() {
          return (
            <ElIcon>
              <SpaceBetweenIcon />
            </ElIcon>
          )
        }
      },
      {
        value: 'space-around',
        tooltip: '横向平分',
        render() {
          return (
            <ElIcon>
              <SpaceAround />
            </ElIcon>
          )
        }
      }
    ]

    const styleProp = 'justify-content'

    return () => {
      return (
        <div class="flex items-center gap-x-2">
          <span
            class={[
              'text-xs w-[48px]',
              {
                'text-[var(--el-color-primary)]': !!props.model[styleProp]
              }
            ]}
          >
            主轴对齐
          </span>
          <RadioButtons
            model-value={getValue(props.model, styleProp)}
            options={options}
            onChange={(value) => {
              setValue(props.model, styleProp, value)
            }}
          />
        </div>
      )
    }
  }
})
