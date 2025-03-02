import { defineComponent } from 'vue'
import { getValue, setValue } from '../../utils'
import './style.scss'

export default defineComponent({
  props: {
    model: {
      type: Object,
      default: undefined
    }
  },
  setup(props) {
    return () => {
      const content = []
      const prefixes = ['margin', 'padding']
      const directions = ['top', 'right', 'bottom', 'left']

      for (let i = 0; i < prefixes.length; i++) {
        const prefix = prefixes[i]
        for (let j = 0; j < directions.length; j++) {
          const direction = directions[j]
          const styleProp = `${prefix}-${direction}`
          content.push(
            <div class={[`lc-layout-${prefix}-${direction}`]}>
              <input
                value={getValue(props.model, styleProp)}
                class={[`lc-layout-input lc-layout-input-${direction}`]}
                minlength="0"
                maxlength="3"
                onInput={(e: InputEvent) => setValue(props.model, styleProp, (e.target as any).value)}
              />
            </div>
          )
        }
      }

      return <div class="lc-layout-gap">{content}</div>
    }
  }
})
