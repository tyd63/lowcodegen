import { registerPageConfig } from '@/widgets/Page'
import type { Component, Block } from '@/types'
import { uid } from 'uid'

export const comp2block = (component: Component): Block => {
  const props = Object.entries(component.props ?? {}).reduce((pureProps, [prop, config]) => {
    pureProps[prop] = config.value
    return pureProps
  }, {})

  const model = Object.entries(component.model ?? {}).reduce((pureModel, [prop, config]) => {
    pureModel[prop] = config.value
    return pureModel
  }, {})

  const style = Object.entries(component.style ?? {}).reduce((pureStyle, [prop, config]) => {
    pureStyle[prop] = config.value
    return pureStyle
  }, {})

  const { key, name, draggable, id, lock = false } = component

  return {
    id: id ?? uid(),
    key,
    name,
    lock,
    draggable,
    props,
    model,
    style,
    events: [],
    actions: [],
    animations: [],
    config: {},
    children: Object.entries(component.children ?? {}).reduce((trans, [slotKey, comps]) => {
      trans[slotKey] = comps?.map((child) => comp2block(child))
      return trans
    }, {})
  }
}

export const getRootBlock = () => {
  return comp2block(registerPageConfig())
}
