import type { Block } from '@/types'
export const genPureProps = (block: Block): Block['props'] => {
  return Object.keys(block.props ?? {}).reduce((pureProps, prop) => {
    pureProps[prop] = block.props[prop]
    return pureProps
  }, {})
}

export const genPureStyle = (block: Block): Block['style'] => {
  return Object.keys(block.style ?? {}).reduce((pureStyle, prop) => {
    pureStyle[prop] = block.style[prop]
    return pureStyle
  }, {})
}

export const genPureModel = (block: Block, state?: Record<string, any>): Block['model'] => {
  return Object.keys(block.model ?? {}).reduce((pureModel, prop) => {
    const stateProp = block.model[prop] as string
    const props = {
      [prop]: state[stateProp],
      [`onUpdate:${prop}`]: (val) => {
        state[stateProp] = val
      }
    }
    return { ...pureModel, ...props }
  }, {})
}
