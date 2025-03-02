import type { Component } from '@/types'

// page
import { registerPageConfig } from './Page'

interface RegisterConfig {
  components: Component[]
  componentMap: Record<string, Component>
  register: (component: Component) => void
}

export const registerConfig: RegisterConfig = {
  components: [],
  componentMap: {},
  register(component) {
    this.components.push(component)
    this.componentMap[component.key] = component
  }
}

export const registerComponents = () => {
  const registerModules = (modules) => {
    for (const key in modules) {
      const config = modules[key]?.default?.()
      if (config) {
        registerConfig.register(config)
      }
    }
  }
  // page
  registerConfig.register(registerPageConfig())

  const modules = import.meta.glob(['./data/*/*.tsx', './basic/*/*.tsx', './form/*/*.tsx', './layout/*/*.tsx'], {
    eager: true
  })

  registerModules(modules)

  return registerConfig
}
