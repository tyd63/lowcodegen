const modules: any = import.meta.glob('./*.ts', { eager: true })
const genHelper = Object.keys(modules).reduce((helper, path) => {
  const key = /\.\/(\w+)\.ts/.exec(path)[1]
  helper[key] = modules[path].default
  return helper
}, {})

export { genHelper }
