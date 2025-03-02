import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

const pathResolve = (dir: string): string => {
  return resolve(__dirname, dir)
}

const alias: Record<string, string> = {
  '@': pathResolve('src')
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias
  },
  plugins: [vue(), vueJsx()],
  optimizeDeps: {
    include: [
      `monaco-editor/esm/vs/language/json/json.worker`,
      `monaco-editor/esm/vs/language/css/css.worker`,
      `monaco-editor/esm/vs/language/html/html.worker`,
      `monaco-editor/esm/vs/language/typescript/ts.worker`,
      `monaco-editor/esm/vs/editor/editor.worker`
    ]
  }
})
