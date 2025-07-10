export function getElementContentWidth(el: HTMLElement): number {
  let pw = el.clientWidth
  const pps = getComputedStyle(el).getPropertyValue("padding")
  if (pps && pps.length > 0) {
    const computedPaddingArray = pps.split(" ")
    pw = pw - parseFloat(computedPaddingArray[1]) - parseFloat(computedPaddingArray[3])
  }
  return pw;
}