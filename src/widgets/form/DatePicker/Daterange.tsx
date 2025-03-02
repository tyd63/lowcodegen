import { ElDatePicker } from 'element-plus'
import MapIcon from '@/icons/Map.vue'
import { defineComponent } from '@/widgets/utils/define'
import { genStyle } from '@/widgets/utils/style'
import { renderPreview } from '@/widgets/utils/render'
import { createInputProp } from '@/widgets/utils/props'
import { genProps, genTypeProp } from './props'

const registerConfig = () => {
  const baseProps = genProps()
  const typeProp = genTypeProp()
  return defineComponent({
    name: '日期范围',
    key: 'daterange',
    group: 'form',
    draggable: true,
    icon: () => <MapIcon />,
    props: {
      ...baseProps,
      'range-separator': createInputProp({ label: '范围分隔符', value: '-' }),
      type: {
        ...typeProp,
        value: 'daterange'
      }
    },
    model: {
      modelValue: createInputProp({ label: 'v-model', value: 'daterange' })
    },
    style: genStyle(),
    events: [],
    actions: [],
    preview: (component) => {
      return renderPreview({ icon: component.icon, name: component.name })
    },
    render: ({ props, model, style }) => {
      return (
        <div style={style}>
          <ElDatePicker {...props} {...model} style={style}></ElDatePicker>
        </div>
      )
    }
  })
}

export default registerConfig
