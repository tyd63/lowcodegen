import { defineComponent } from 'vue'
import RadioButtons from '@/components/RadioButtons'
import { ElIcon } from 'element-plus'
import { getValue, setValue } from '../../utils'

import RowIcon from './icons/Row.vue'
import RowReverseIcon from './icons/RowReverse.vue'
import ColumnIcon from './icons/Column.vue'
import ColumnReverse from './icons/ColumnReverse.vue'

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
        value: 'row',
        tooltip: '水平方向，起点在左侧',
        render() {
          return (
            <ElIcon>
              <RowIcon />
            </ElIcon>
          )
        }
      },
      {
        value: 'row-reverse',
        tooltip: '水平方向，起点在右侧',
        render() {
          return (
            <ElIcon>
              <RowReverseIcon />
            </ElIcon>
          )
        }
      },
      {
        value: 'column',
        tooltip: '垂直方向，起点在上沿',
        render() {
          return (
            <ElIcon>
              <ColumnIcon />
            </ElIcon>
          )
        }
      },
      {
        value: 'column-reverse',
        tooltip: '垂直方向，起点在下沿',
        render() {
          return (
            <ElIcon>
              <ColumnReverse />
            </ElIcon>
          )
        }
      }
    ]

    const styleProp = 'flex-direction'

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
            主轴方向
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
