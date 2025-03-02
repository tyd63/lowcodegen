type StateElement = HTMLElement & { __state__: Record<string, any> }

interface DState {
  ghostEl: StateElement
  blockEl: HTMLElement
  imageEl: StateElement
}

enum PFlag {
  Slot = 'Slot',
  Block = 'Block',
  Ghost = 'Ghost',
  Image = 'Image'
}

export const dState: DState = {
  ghostEl: null,
  blockEl: null,
  imageEl: null
}

const createElement = (string) => {
  const el = document.createElement(string) as StateElement
  el.__state__ = {}
  return el
}

const findParentEl = (el: HTMLElement, pFlag: PFlag) => {
  while (el) {
    if (el.getAttribute?.('data-role') === pFlag) {
      return el
    }
    el = el.parentElement
  }
}

const isBlock = (blockEl: HTMLElement) => {
  if (blockEl) {
    const display = document.defaultView?.getComputedStyle(blockEl, '').display
    return ['block', 'flex'].includes(display)
  }
}

const calcPos = (e: DragEvent, idx: number) => {
  const blockEl = dState.blockEl
  const { height, top, left, width } = blockEl.getBoundingClientRect()
  if (isBlock(blockEl)) {
    return e.pageY - top <= height / 2 ? idx : idx + 1
  } else {
    return e.pageX - left <= width / 2 ? idx : idx + 1
  }
}

const setGhostElStyle = () => {
  const blockEl = dState.blockEl
  const ghostEl = dState.ghostEl
  const setBockStyle = () => {
    ghostEl.classList.add('lc-ghost-block')
    ghostEl.classList.remove('lc-ghost-inline-block')
    ghostEl.style.removeProperty('--height')
  }

  const setInlineBlockStyle = () => {
    ghostEl.classList.add('lc-ghost-inline-block')
    ghostEl.classList.remove('lc-ghost-block')
    ghostEl.style.setProperty('--height', `${blockEl.clientHeight}px`)
  }

  if (blockEl) {
    isBlock(blockEl) ? setBockStyle() : setInlineBlockStyle()
  } else {
    setBockStyle()
  }
}

const rfaThrottle = (fn, delay) => {
  let prev = 0
  return (...args) => {
    const n = Date.now()
    if (n - prev >= delay) {
      fn(...args)
      prev = n
    }
  }
}

export const createGhost = rfaThrottle((e: DragEvent) => {
  const target = e.target as HTMLElement
  if (target.getAttribute?.('data-role') === PFlag.Ghost) {
    return
  }
  const slotEl = findParentEl(target, PFlag.Slot)
  if (!slotEl) return
  removeRef()
  let ghostEl = dState.ghostEl
  if (!ghostEl) {
    ghostEl = createElement('div')
    ghostEl.setAttribute('data-role', PFlag.Ghost)
    dState.ghostEl = ghostEl
  }
  ghostEl.__state__.slotKey = slotEl.getAttribute('data-slot-key')
  ghostEl.__state__.blockId = slotEl.getAttribute('data-block-id')
  const blockNodes = Array.from(slotEl.children).filter((child) => child.getAttribute?.('data-role') === PFlag.Block)
  if (!blockNodes.length) {
    slotEl.insertBefore(ghostEl, null)
    ghostEl.__state__.idx = 0
    setGhostElStyle()
    return
  }
  const blockEl = findParentEl(target, PFlag.Block)
  if (!blockEl) return
  dState.blockEl = blockEl
  let idx = blockNodes.indexOf(blockEl)
  if (idx > -1) {
    idx = calcPos(e, idx)
    slotEl.insertBefore(ghostEl, blockNodes[idx])
    ghostEl.__state__.idx = idx
    setGhostElStyle()
  } else {
    slotEl.insertBefore(ghostEl, null)
    ghostEl.__state__.idx = blockNodes.length
    setGhostElStyle()
  }
}, 32)

export const createImage = (e: DragEvent, name: string) => {
  let imageEl = dState.imageEl
  if (!imageEl) {
    imageEl = createElement('div')
    imageEl.setAttribute('data-role', PFlag.Image)
    imageEl.classList.add('lc-drag-image')
    dState.imageEl = imageEl
    document.body.appendChild(imageEl)
  }
  imageEl.textContent = name
  e.dataTransfer.setDragImage(imageEl, 0, 0)
  e.dataTransfer.dropEffect = 'copy'
}

export const removeRef = () => {
  const { ghostEl, imageEl, blockEl } = dState
  if (ghostEl) {
    ghostEl.remove()
    dState.ghostEl = null
  }
  if (imageEl) {
    imageEl.remove()
    dState.imageEl = null
  }

  if (blockEl) {
    dState.blockEl = null
  }
}
