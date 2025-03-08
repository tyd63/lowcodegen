import { uid } from 'uid'
import { generate_common_props, generate_common_style, generate_handler, imports, resolve_attrs, statements } from '../utils'

export default generate_handler({
  getStartTag(tag, block, ctx) {
    return `<${tag} ${resolve_attrs(this.getAttrs(block, ctx))}>`
  },
  getEndTag(tag) {
    return `</${tag}>`
  },
  getAttrs(block, ctx) {
    const _attrs = []
    const props = generate_common_props(block.props, ['preview-src-list'])
    if (props.length) {
      _attrs.push(...props)
    }

    if (block.props['preview-src-list']?.length) {
      const preview_src_list = block.props['preview-src-list'].map((item) => item.value)
      const variable = `preview_src_list_${uid(6)}`
      _attrs.push([':preview_src_list', variable])
      statements(ctx, variable, `${JSON.stringify(preview_src_list)}`)
    }

    const style = generate_common_style(block.style)
    if (style.length) {
      _attrs.push(style)
    }
    return _attrs
  }
})
