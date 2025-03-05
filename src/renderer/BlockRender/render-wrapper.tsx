import { defineComponent } from 'vue'

const RenderWrapper = defineComponent({
  props: {
    styles: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { slots }) {
    return () => {
      return (
        <div class="__render_wrapper" style={props.styles}>
          {slots.default?.()}
        </div>
      )
    }
  }
})

export { RenderWrapper }
