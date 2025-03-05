import { generate_common_props, generate_common_style, imports, generate_handler, resolve_attrs } from '../utils'

export default generate_handler({
  getStartTag(tag, block, ctx) {
    return `<${tag} ${resolve_attrs(this.getAttrs(block, ctx))}>`
  },
  getEndTag(tag) {
    return `</${tag}>`
  },
  getAttrs(block, ctx) {
    const _attrs = []
    const props = generate_common_props(block.props, ['icon'])
    if (props.length) {
      _attrs.push(...props)
    }
    const style = generate_common_style(block.style)
    if (style.length) {
      _attrs.push(style)
    }

    if (block.props.icon) {
      imports(ctx, '@element-plus/icons-vue', block.props.icon)
    }
    return _attrs
  },
  getChildren(block) {
    return block.props.icon ? `<${block.props.icon}/>` : ''
  }
})
