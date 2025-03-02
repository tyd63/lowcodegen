import { generate_handler } from '../utils'

export default generate_handler({
  getAttrs(block: { id: any }) {
    return [['id', block.id]]
  },
  getChildren() {
    return ''
  }
})
