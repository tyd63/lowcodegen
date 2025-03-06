import { generate_common_props, generate_handler } from '../utils'

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
