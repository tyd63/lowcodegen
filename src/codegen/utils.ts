import { Block } from '@/types'

export const is_string = (value: unknown) => {
  return typeof value === 'string'
}

export const to_kebab_case = (string: string): string => {
  return string.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}

export const generate_common_props = (props: Block['props'], excludes: string[] = []) => {
  const attrs = []
  Object.entries<any>(props).forEach(([key, value]) => {
    if (excludes.includes(key) || value === '' || value == null) return
    if (is_string(value)) {
      attrs.push([to_kebab_case(key), value])
    } else {
      attrs.push([to_kebab_case(`:${key}`), value])
    }
  })
  return attrs
}

export const generate_common_style = (style: Block['style'], excludes: string[] = []) => {
  let styleStr = ''
  Object.entries<any>(style).forEach(([key, value]) => {
    if (excludes.includes(key) || !value) return
    if (is_string(value)) {
      styleStr += `${to_kebab_case(key)}:${value};`
    }
  })
  return styleStr ? ['style', styleStr] : []
}

export const generate_common_icon = (props: Block['props'], icons: string[], ctx: any) => {
  const attrs = []
  icons.forEach((icon) => {
    if (props[icon]) {
      imports(ctx, '@element-plus/icons-vue', props[icon])
      attrs.push([`:${icon}`, props[icon]])
    }
  })
  return attrs
}

export const resolve_attrs = (attrs) => {
  if (attrs.length) {
    return attrs.map(([key, value]) => `${key}="${value}"`).join(' ')
  }
  return ''
}

export const imports = (ctx, module, method) => {
  let methods = ctx.script.import[module]
  if (!methods) {
    methods = ctx.script.import[module] = []
  }
  if (!methods.includes(method)) {
    methods.push(method)
  }
}

export const fns = (ctx, name, code) => {
  const fn = ctx.script.fns[name]
  if (!fn) {
    ctx.script.fns[name] = code
  }
}

export const calls = (ctx, code) => {
  ctx.script.calls.push(code)
}

export const statements = (ctx, name, code) => {
  const _var = ctx.script.statements[name]
  if (!_var) {
    ctx.script.statements[name] = code
  }
}

export const resolve_animation = (ctx, block) => {
  if (block.animations.length) {
    fns(
      ctx,
      'play_animation',
      `
      const play_animation = (el, animates = [], index = 0) => {
        if (index >= animates.length) {
          return
        }
        const animation = animates[index]
        const animationEnd = (e) => {
          e.stopPropagation()
          el.classList.remove('animate__animated', 'animate__' + animation.value)
          el.removeEventListener('animationend', animationEnd)
          setTimeout(() => {
            play_animation(el,animates, index + 1)
          })
        }
        el.classList.value = el.classList.value.split(' ').filter((item) => !item.includes('animate__')).join(' ')
        el.style.setProperty('--animate-duration', animation.duration + 's')
        el.style.setProperty('animation-delay', animation.delay + 's')
        el.style.setProperty('animation-iteration-count', animation.infinite ? 'infinite' : animation.count)
        el.classList.add('animate__animated', 'animate__' + animation.value)
        el.addEventListener('animationend', animationEnd, { once: true })
      }`
    )

    imports(ctx, 'vue', 'onMounted')

    calls(
      ctx,
      `
      onMounted(() => {
          play_animation(document.querySelector('[data-id="${block.id}"]'),${JSON.stringify(block.animations)})
      })
      `
    )
  }
}

export const generate_handler = (handlers: {
  getAttrs: (block: Block, ctx: any) => any[]
  getStartTag?: (tag: string, block: Block, ctx: any) => string
  getEndTag?: (tag: string) => string
  getChildren?: (block: Block, ctx: any) => string
}) => {
  const config = {
    getStartTag(tag, block, ctx) {
      const style = generate_common_style(block.style)
      let str = '<div class="__render_wrapper"'
      if (style.length) {
        str += ` style="${style[1]}"`
      }
      str += `><${tag}`
      const attrs = this.getAttrs(block, ctx)
      attrs.unshift(['data-id', block.id])
      if (attrs.length) {
        str += ` ${resolve_attrs(attrs)}>`
      }
      return str
    },
    getEndTag(tag) {
      return `</${tag}></div>`
    },
    handler(tag, { block, ctx }, children) {
      const startTag = this.getStartTag(tag, block, ctx)
      const endTag = this.getEndTag(tag)
      const _children = children ? children : (this.getChildren?.(block, ctx) ?? ' ')
      const ret = [startTag, _children, endTag]
      resolve_animation(ctx, block)
      return ret.join('')
    },
    ...handlers
  }
  return config
}
