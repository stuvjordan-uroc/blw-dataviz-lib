export function resizeSVG(svg: SVGElement, parentWidth: number, svgAspectRatio: number) {
  svg.setAttribute("width", parentWidth.toString())
  svg.setAttribute("height", Math.round(parentWidth / svgAspectRatio).toString())
}