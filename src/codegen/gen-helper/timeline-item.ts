import { generate_common_icon, generate_common_props, generate_common_style, generate_handler, resolve_attrs } from '../utils'

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
    const icons = generate_common_icon(block.props, ['icon'], ctx)
    if (icons.length) {
      _attrs.push(...icons)
    }
    const style = generate_common_style(block.style)
    if (style.length) {
      _attrs.push(style)
    }

    return _attrs
  }
})
