import type { FunctionalComponent, VNode } from 'vue'

export type NormalData = string | number | boolean

export interface SelectOption {
  label?: string
  value: NormalData
}

export interface ComponentPropConfig {
  key?: string
  label?: string
  value?: unknown
  row?: boolean
  options?: SelectOption[]
  [key: string]: unknown
}

export interface ComponentStyleConfig {
  value: NormalData
  options?: SelectOption[]
  [key: string]: unknown
}

export type ComponentChild = Record<string, Component[]>

export interface Component {
  id?: string
  key: string
  name?: string
  group?: string
  draggable?: boolean
  lock?: boolean
  icon?: FunctionalComponent
  props?: Record<string, ComponentPropConfig>
  model?: Record<string, ComponentPropConfig>
  style?: Record<string, ComponentStyleConfig>
  children?: ComponentChild
  events?: []
  actions?: []
  preview?: (component: Component) => VNode
  render?: (props: Record<string, any>) => VNode
}

export type BlockChild = Record<string, Block[]>

export interface Animation {
  id: string
  playing: boolean
  label: string
  value: string
  duration: number
  delay: number
  count: number
  infinite: boolean
}

export interface Block {
  id: string
  key: string
  name: string
  draggable: boolean
  lock: boolean
  props: Record<string, any>
  model: Record<string, any>
  style: Record<string, string | number>
  events: []
  actions: []
  animations: Animation[]
  config: Record<string, unknown>
  children: BlockChild
}

export interface GlobalData {
  blocks: Block[]
}

export type Data = Record<string, unknown>
