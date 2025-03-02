// hex转rgb
function hexToRgb(str) {
  const hxs = str.replace('#', '').match(/../g)
  for (let i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16)
  return hxs
}

// rgb转hex
function rgbToHex(a, b, c) {
  const hexs = [a.toString(16), b.toString(16), c.toString(16)]
  for (let i = 0; i < 3; i++) {
    if (hexs[i].length == 1) hexs[i] = `0${hexs[i]}`
  }
  return `#${hexs.join('')}`
}

// 加深颜色值
export function darken(color, level) {
  const rgbc = hexToRgb(color)
  for (let i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level))
  return rgbToHex(rgbc[0], rgbc[1], rgbc[2])
}

// 变浅颜色值
export function lighten(color, level) {
  const rgbc = hexToRgb(color)
  for (let i = 0; i < 3; i++) rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i])
  return rgbToHex(rgbc[0], rgbc[1], rgbc[2])
}
