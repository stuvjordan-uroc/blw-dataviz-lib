export function getElementContentWidth(el: HTMLElement): number {
  let pw = el.clientWidth
  const window = document.defaultView
  if (!window) {
    return NaN
  }
  const ppsLeft =  parseFloat(window.getComputedStyle(el).getPropertyValue("padding-left"))
  const ppsRight = parseFloat(window.getComputedStyle(el).getPropertyValue("padding-right"))
  if (!isNaN(ppsLeft)) {
    pw = pw - ppsLeft
  }
  if (!isNaN(ppsRight)) {
    pw = pw - ppsRight
  }
  return pw;
}