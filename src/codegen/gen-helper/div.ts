import { generate_common_style, generate_handler } from '../utils'

export default generate_handler({
  getAttrs(block) {
    const _attrs = []
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
