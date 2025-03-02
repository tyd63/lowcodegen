import { defineComponent } from 'vue'
import Layout from './Layout'
import CssCode from './CssCode'

export default defineComponent({
  props: {
    draft: {
      type: Object,
      default: undefined
    },
    component: {
      type: Object,
      default: undefined
    }
  },
  setup(props) {
    return () => {
      if (!props.component) return null
      return (
        <>
          <CssCode model={props.draft.style} />
          <Layout class="mt-4" model={props.draft.style} component={props.component} />
        </>
      )
    }
  }
})
