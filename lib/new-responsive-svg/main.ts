import { randomId } from "./random-id"
import { resizeSVG } from "./resize-svg"
export function newResponsiveSVG(config: {
  [key: string] : number | string,
  maxXCoord: number | string,
  maxYCoord: number | string,
  containerId: string
}): string | null {

  //return null if config undefined
  if (!config) {
    return null
  }
  //throw/return null if maxXCoord or maxYCoord are not sane
  ["maxXCoord", "maxYCoord"].forEach((el) => {
    if (!config[el]) {
      return null
    }
    if (!["string", "number"].includes(typeof config[el])){
      throw new Error(`The ${el} property of the config you pass to newResponsiveSVG must be a string or number`)
    }
  }) 

  //make the xMax and yMax into numbers
  const xMaxNum = (typeof config.maxXCoord === "number") ? config.maxXCoord : parseFloat(config.maxXCoord);
  const yMaxNum = (typeof config.maxYCoord === "number") ? config.maxYCoord : parseFloat(config.maxYCoord);
  //throw if the values aren't sane
  if (xMaxNum <= 0 || yMaxNum <= 0) {
    throw new Error(`The maxXCoord and maxYCoord properties of the config passed to newResponseiveSVG must be strictly greater than 0.`)
  }

  //calculate the aspect ratio

  
  const svgAspectRatio = xMaxNum/yMaxNum
  
  
  //create svg and set attributes
  const svg = document.createElement("svg")
  const svgId = randomId()
  svg.setAttribute("id", svgId)
  svg.setAttribute("width", xMaxNum.toString())
  svg.setAttribute("height", yMaxNum.toString())
  svg.setAttribute("viewBox", `0 0 ${xMaxNum.toString()} ${yMaxNum.toString()}`)
  svg.setAttribute("preserveAspectRatio", "xMinYMid")
  
  //resize svg to current parent width
  const parent = document.getElementById(config.containerId)
  if (!parent) {
    return null
  }
  const parentWidth = parseFloat(parent.style.width)
  resizeSVG(svg, parentWidth, svgAspectRatio)

  //set an event listener on the window that resizes the svg when called
  window.addEventListener("resize", () => {
    const parent = document.getElementById(config.containerId)
    if (!parent) {
      throw new Error(`We detected a window resize, and thus tried to resize an svg created with newResponseiveSVG.  But you passed the containerId ${config.containerId} to newResponsiveSVG and we cannot find an element in the document with that id.`)
    }
    const parentWidth = parseFloat(parent.style.width)
    resizeSVG(svg, parentWidth, svgAspectRatio)
  })


  //attach svg to the container
  parent.appendChild(svg)

  //return the id string of the svg
  return svgId



}