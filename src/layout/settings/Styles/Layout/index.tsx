import { defineComponent } from 'vue'
import Collapse from '@/components/Collapse'
import RowItem from '@/components/RowItem'
import InputNumber from './InputNumber'
import Gap from './Gap'
import Display from './Display'
import FlexDirection from './FlexDirection'
import JustifyContent from './JustifyContent'
import AlignItems from './AlignItems'
import FlexWrap from './FlexWrap'
import VerticalAlign from './VerticalAlign'

export default defineComponent({
  props: {
    model: {
      type: Object,
      default: undefined
    },
    component: {
      type: Object,
      default: undefined
    }
  },
  setup(props) {
    const componentStyle = props.component.style

    return () => {
      return (
        <Collapse title="布局" default-collapse={true}>
          <Display model={props.model} />
          {props.model?.display === 'flex' && (
            <>
              <FlexDirection class="mt-2" model={props.model} />
              <JustifyContent class="mt-2" model={props.model} />
              <AlignItems class="mt-2" model={props.model} />
              <FlexWrap class="mt-2" model={props.model} />
            </>
          )}
          {props.model?.display === 'inline-block' && (
            <>
              <VerticalAlign class="mt-2" model={props.model} />
            </>
          )}
          <Gap class="mt-2" model={props.model} />

          <div class="flex justify-between mt-4">
            <RowItem label="宽度">
              <InputNumber prop="width" model={props.model} component-style={componentStyle} />
            </RowItem>
            <RowItem label="高度">
              <InputNumber prop="height" model={props.model} component-style={componentStyle} />
            </RowItem>
          </div>
        </Collapse>
      )
    }
  }
})
