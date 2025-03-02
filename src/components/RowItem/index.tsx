import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    label: {
      type: String,
      default: undefined
    }
  },
  setup(props, { slots }) {
    return () => {
      return (
        <div class="flex items-center gap-x-1.5">
          <span class="text-xs">{props.label}</span>
          {slots.default?.()}
        </div>
      )
    }
  }
})
