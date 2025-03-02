import doc from './doc.html?raw'

const resolveMap = {}

window.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'prettier_result') {
    const resolveId = e.data.id
    if (resolveMap[resolveId]) {
      resolveMap[resolveId](e.data.code)
      delete resolveMap[resolveId]
    }
  }
})

let uid = 0
export const prettier = async (code): Promise<string> => {
  let iframe: HTMLIFrameElement = document.querySelector('#Prettier')
  if (!iframe) {
    iframe = document.createElement('iframe')
    iframe.srcdoc = doc
    iframe.id = 'Prettier'
    iframe.style.cssText += 'width:0;height:0;border:0;display:none;'
    document.body.appendChild(iframe)
    await new Promise((resolve) => {
      iframe.onload = resolve
    })
  }
  const id = `prettier_resolve_${++uid}`
  iframe.contentWindow.postMessage({
    type: 'prettier',
    code,
    id
  })
  const prettierCode = await new Promise((resolve) => {
    resolveMap[id] = resolve
  })
  return prettierCode as string
}
