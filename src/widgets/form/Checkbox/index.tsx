import { ElCheckboxGroup, ElCheckbox } from 'element-plus'
import MapIcon from '@/icons/Map.vue'
import { defineComponent } from '@/widgets/utils/define'
import { genStyle } from '@/widgets/utils/style'
import { renderPreview } from '@/widgets/utils/render'
import { createInputProp } from '@/widgets/utils/props'
import { genProps } from './props'

const registerConfig = () => {
  return defineComponent({
    name: '多选框',
    key: 'checkbox',
    group: 'form',
    draggable: true,
    icon: () => <MapIcon />,
    props: genProps(),
    model: {
      modelValue: createInputProp({ label: 'v-model', value: 'checkbox' })
    },
    style: genStyle(),
    events: [],
    actions: [],
    preview: (component) => {
      return renderPreview({ icon: component.icon, name: component.name })
    },
    render: ({ props, model, style }) => {
      return (
        <ElCheckboxGroup {...props} {...model} style={style}>
          {props.options.map((opt) => (
            <ElCheckbox key={opt.value} value={opt.value} border={props.border} disabled={opt.disabled}>
              {opt.label}
            </ElCheckbox>
          ))}
        </ElCheckboxGroup>
      )
    }
  })
}

export default registerConfig
