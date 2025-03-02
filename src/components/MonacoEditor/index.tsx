import { defineComponent, ref, watch, onUnmounted, nextTick, computed, onMounted } from 'vue'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'

import * as monaco from 'monaco-editor'
import type { CSSProperties, PropType } from 'vue'
import { useTheme } from '@/hooks/use-theme'

export default defineComponent({
  props: {
    code: {
      type: String,
      default: ''
    },
    language: {
      type: String as PropType<'javascript' | 'typescript' | 'json' | 'scss' | 'css' | 'html'>,
      default: 'json'
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const { themeMode } = useTheme()
    const containerRef = ref<HTMLElement>()
    const style = computed(() => {
      return {
        height: '100%'
      } as CSSProperties
    })

    const codeTheme = computed(() => (themeMode.value === 'dark' ? 'vs-dark' : 'vs'))

    window.MonacoEnvironment = {
      getWorker(_: string, label: string) {
        if (label === 'json') {
          return new jsonWorker()
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
          return new cssWorker()
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
          return new htmlWorker()
        }
        if (['typescript', 'javascript'].includes(label)) {
          return new tsWorker()
        }
        return new EditorWorker()
      }
    }

    let editor: monaco.editor.IStandaloneCodeEditor
    const initMonacoEditor = () => {
      if (!containerRef.value) return
      if (editor) {
        editor.updateOptions({
          readOnly: props.readonly,
          theme: codeTheme.value
        })
        editor.setValue(props.code)
        return
      }

      editor = monaco.editor.create(containerRef.value!, {
        theme: codeTheme.value,
        language: props.language,
        value: props.code,
        automaticLayout: true,
        tabSize: 2,
        minimap: {
          enabled: false
        },
        scrollBeyondLastLine: false,
        overviewRulerBorder: false,
        readOnly: props.readonly
      })

      editor.onDidChangeModelContent(() => {
        emit('change', editor.getValue())
      })

      editor.setValue(props.code)
    }

    onMounted(() => {
      initMonacoEditor()
    })

    onUnmounted(() => {
      editor.dispose()
      editor = null
    })

    watch(
      () => props.readonly,
      () => {
        nextTick(initMonacoEditor)
      }
    )

    watch(
      () => themeMode.value,
      () => {
        nextTick(initMonacoEditor)
      }
    )

    return () => {
      return <div style={{ ...style.value }} ref={containerRef}></div>
    }
  }
})
