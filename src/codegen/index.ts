import { store } from '@/store'
import { cloneDeep } from 'lodash-es'
import { genHelper } from './gen-helper'
import { prettier } from './prettier'
import { COMP_MAP } from './comp-map'

console.log('genHelper', genHelper)

const walk = (block, ctx) => {
  let children = ''
  if (block.children) {
    const slotKeys = Object.keys(block.children)
    for (let i = 0; i < slotKeys.length; i++) {
      const blocks = block.children[slotKeys[i]]
      for (let j = 0; j < blocks.length; j++) {
        children += walk(blocks[j], ctx)
      }
    }
  }
  const key = block.key
  const tag = COMP_MAP[key]
  const content = genHelper[key].handler(tag, { block, ctx }, children)
  return content
}

const traverse = (blocks, ctx) => {
  for (let i = 0; i < blocks.length; i++) {
    ctx.template += walk(blocks[i], ctx)
  }
  return ctx.template
}

const genVueSFC = async (ctx, formatter = true) => {
  const imports = []
  Object.entries<any>(ctx.script.import).forEach(([module, methods]) => {
    if (methods.length) {
      const row = `import { ${methods.join(',')} } from '${module}'`
      imports.push(row)
    }
  })

  const fns = Object.values(ctx.script.fns)

  const calls = ctx.script.calls

  const statements = []
  Object.entries<any>(ctx.script.statements).forEach(([variable, statement]) => {
    statements.push(`let ${variable} = ${statement}`)
  })

  let sfc = `
  <script lang="ts" setup>
  ${imports.join('\n')}
  ${statements.join('\n')}
  ${fns.join('\n')}
  ${calls.join('\n')}
  </script>
  <template>${ctx.template}</template>
  `

  if (formatter) {
    sfc = await prettier(sfc)
  }
  return sfc
}

export const codegen = () => {
  const blocks = cloneDeep(store.globalData.blocks)
  const ctx = {
    script: {
      import: {
        vue: [],
        '@element-plus/icons-vue': []
      },
      calls: [],
      fns: {},
      statements: {}
    },
    template: ''
  }
  traverse(blocks, ctx)

  return genVueSFC(ctx)
}
