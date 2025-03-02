import { generate_common_props, generate_common_style, generate_handler } from '../utils'

export default generate_handler({
  getAttrs(block) {
    const _attrs = []
    const props = generate_common_props(block.props, ['content'])
    if (props.length) {
      _attrs.push(...props)
    }
    const style = generate_common_style(block.style)
    if (style.length) {
      _attrs.push(style)
    }
    return _attrs
  },
  getChildren(block) {
    return block.props.content
  }
})
