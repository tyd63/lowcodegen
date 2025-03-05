import { generate_common_props, generate_common_style, generate_handler, resolve_attrs } from '../utils'

export default generate_handler({
  getAttrs(block) {
    const _attrs = []
    const props = generate_common_props(block.props, ['items'])
    if (props.length) {
      _attrs.push(...props)
    }
    return _attrs
  }
})
