import type { App } from 'vue'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'

import 'element-plus/dist/index.css'

export const useElementPlus = (app: App) => {
  app.use(ElementPlus)

  for (const [key, component] of Object.entries(Icons)) {
    app.component(key, component)
  }
}
