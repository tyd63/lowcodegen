import { defineComponent } from 'vue'
import RadioButtons from '@/components/RadioButtons'
import { ElIcon } from 'element-plus'
import { getValue, setValue } from '../../utils'

import TopIcon from './icons/Top.vue'
import MiddleIcon from './icons/Middle.vue'
import BottomIcon from './icons/Bottom.vue'
import BaselineIcon from './icons/Baseline.vue'

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
        value: 'top',
        tooltip: '顶部对齐',
        render() {
          return (
            <ElIcon>
              <TopIcon />
            </ElIcon>
          )
        }
      },
      {
        value: 'middle',
        tooltip: '垂直居中',
        render() {
          return (
            <ElIcon>
              <MiddleIcon />
            </ElIcon>
          )
        }
      },
      {
        value: 'bottom',
        tooltip: '底部对齐',
        render() {
          return (
            <ElIcon>
              <BottomIcon />
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
      }
    ]

    const styleProp = 'vertical-align'

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
            对齐方式
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
