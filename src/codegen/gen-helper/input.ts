import { generate_common_props, imports, generate_handler, statements, generate_common_icon } from '../utils'

export default generate_handler({
  getAttrs(block, ctx) {
    const _attrs = []
    const props = generate_common_props(block.props, ['prefix-icon', 'suffix-icon'])
    if (props.length) {
      _attrs.push(...props)
    }
    const icons = generate_common_icon(block.props, ['suffix-icon', 'prefix-icon'], ctx)
    if (icons.length) {
      _attrs.push(...icons)
    }

    if (block.model) {
      imports(ctx, 'vue', 'reactive')
      statements(ctx, 'formData', `reactive({})`)
      _attrs.unshift(['v-model', `formData.${block.model.modelValue}`])
    }

    return _attrs
  }
})
