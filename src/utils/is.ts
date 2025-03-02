export const isPage = (id: string) => {
  return id?.startsWith?.('@root')
}

export const isSlot = (id: string) => {
  return id?.startsWith?.('@slot')
}
