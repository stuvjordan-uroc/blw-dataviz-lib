export function resizeSVG(svg: HTMLElement, parentWidth: number, svgAspectRatio: number) {
  svg.setAttribute("width", parentWidth.toString())
  svg.setAttribute("height", Math.round(parentWidth / svgAspectRatio).toString())
}