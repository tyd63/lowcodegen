import { generate_handler, resolve_attrs } from '../utils'

export default generate_handler({
  getStartTag(tag, block, ctx) {
    return `<${tag} ${resolve_attrs(this.getAttrs(block, ctx))}>`
  },
  getEndTag(tag) {
    return `</${tag}>`
  },
  getAttrs(block: { id: any }) {
    return [
      ['data-id', block.id],
      ['id', block.id]
    ]
  }
})
