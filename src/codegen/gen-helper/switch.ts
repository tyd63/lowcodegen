import { generate_common_props, generate_common_style, imports, generate_handler, statements, generate_common_icon } from '../utils'

export default generate_handler({
  getAttrs(block, ctx) {
    const _attrs = []
    const props = generate_common_props(block.props, ['active-icon', 'inactive-icon'])
    if (props.length) {
      _attrs.push(...props)
    }
    const style = generate_common_style(block.style)
    if (style.length) {
      _attrs.push(style)
    }
    if (block.model) {
      imports(ctx, 'vue', 'reactive')
      statements(ctx, 'formData', `reactive({})`)
      _attrs.unshift(['v-model', `formData.${block.model.modelValue}`])
    }
    const icons = generate_common_icon(block.props, ['active-icon', 'inactive-icon'], ctx)
    if (icons.length) {
      _attrs.push(...icons)
    }
    return _attrs
  },
  getChildren() {
    return ''
  }
})
