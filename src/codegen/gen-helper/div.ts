import { generate_common_style, generate_handler, resolve_attrs } from '../utils'

export default generate_handler({
  getStartTag(tag, block, ctx) {
    return `<${tag} ${resolve_attrs(this.getAttrs(block, ctx))}>`
  },
  getEndTag(tag) {
    return `</${tag}>`
  },
  getAttrs(block) {
    const _attrs = []
    const style = generate_common_style(block.style)
    if (style.length) {
      _attrs.push(style)
    }
    return _attrs
  },
  getChildren(block) {
    return block.props.content as string
  }
})
