import { ElOption, ElSelect } from 'element-plus'
import MapIcon from '@/icons/Map.vue'
import { defineComponent } from '@/widgets/utils/define'
import { genStyle } from '@/widgets/utils/style'
import { renderPreview } from '@/widgets/utils/render'
import { createInputProp } from '@/widgets/utils/props'
import { genProps } from './props'

const registerConfig = () => {
  return defineComponent({
    name: '选择器',
    key: 'select',
    group: 'form',
    draggable: true,
    icon: () => <MapIcon />,
    props: genProps(),
    model: {
      modelValue: createInputProp({ label: 'v-model', value: 'select' })
    },
    style: genStyle(),
    events: [],
    actions: [],
    preview: (component) => {
      return renderPreview({ icon: component.icon, name: component.name })
    },
    render: ({ props, model, style }) => {
      if (props.multiple) {
        model.modelValue = []
      }

      return (
        <ElSelect {...props} {...model} style={style}>
          {props.options?.map((opt) => <ElOption key={opt.value} value={opt.value} label={opt.label} disabled={opt.disabled}></ElOption>)}
        </ElSelect>
      )
    }
  })
}

export default registerConfig
