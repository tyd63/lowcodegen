import { defineComponent } from 'vue'
import RadioButtons from '@/components/RadioButtons'
import { ElIcon } from 'element-plus'
import { getValue, setValue } from '../../utils'

import FlexStartIcon from './icons/FlexStart.vue'
import FlexEndIcon from './icons/FlexEnd.vue'
import CenterIcon from './icons/Center.vue'
import BaselineIcon from './icons/Baseline.vue'
import StretchIcon from './icons/Stretch.vue'

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
        tooltip: '起点对齐',
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
        tooltip: '终点对齐',
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
        tooltip: '垂直居中',
        render() {
          return (
            <ElIcon>
              <CenterIcon />
            </ElIcon>
          )
        }
      },
      {
        value: 'baseline',
        tooltip: '基线对齐',
        render() {
          return (
            <ElIcon>
              <BaselineIcon />
            </ElIcon>
          )
        }
      },
      {
        value: 'stretch',
        tooltip: '占满整个容器的高度',
        render() {
          return (
            <ElIcon>
              <StretchIcon />
            </ElIcon>
          )
        }
      }
    ]

    const styleProp = 'align-items'

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
            辅轴对齐
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
