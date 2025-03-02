import { defineComponent } from 'vue'
import RadioButtons from '@/components/RadioButtons'

import { ElIcon } from 'element-plus'
import { getValue, setValue } from '../../utils'

import InlineIcon from './icons/Inline.vue'
import FlexIcon from './icons/Flex.vue'
import BlockIcon from './icons/Block.vue'
import InlineBlockIcon from './icons/InlineBlock.vue'
import NoneIcon from './icons/None.vue'

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
        value: 'inline',
        tooltip: '内联布局',
        render() {
          return (
            <ElIcon>
              <InlineIcon />
            </ElIcon>
          )
        }
      },
      {
        value: 'flex',
        tooltip: '弹性布局',
        render() {
          return (
            <ElIcon>
              <FlexIcon />
            </ElIcon>
          )
        }
      },
      {
        value: 'block',
        tooltip: '块级布局',
        render() {
          return (
            <ElIcon>
              <BlockIcon />
            </ElIcon>
          )
        }
      },
      {
        value: 'inline-block',
        tooltip: '内联块布局',
        render() {
          return (
            <ElIcon>
              <InlineBlockIcon />
            </ElIcon>
          )
        }
      },
      {
        value: 'none',
        tooltip: '隐藏',
        render() {
          return (
            <ElIcon>
              <NoneIcon />
            </ElIcon>
          )
        }
      }
    ]
    const styleProp = 'display'

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
            布局模式
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
