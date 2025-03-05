import { generate_common_props, generate_common_style, imports, generate_handler, statements } from '../utils'

export default generate_handler({
  getAttrs(block, ctx) {
    const _attrs = []
    const props = generate_common_props(block.props, ['options'])
    if (props.length) {
      _attrs.push(...props)
    }

    if (block.model) {
      imports(ctx, 'vue', 'reactive')
      statements(ctx, 'formData', `reactive({})`)
      _attrs.unshift(['v-model', `formData.${block.model.modelValue}`])
    }

    return _attrs
  },
  getChildren(block, ctx) {
    const variable = `${block.model.modelValue}_options`
    statements(ctx, variable, `${JSON.stringify(block.props.options)}`)
    return `<el-option v-for="(item,idx) in ${variable}" :key="idx" :value="item.value" :label="item.label":disabled="item.disabled"></el-option>`
  }
})
