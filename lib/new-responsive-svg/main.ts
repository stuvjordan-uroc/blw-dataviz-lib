import { randomId } from "./random-id"
import { resizeSVG } from "./resize-svg"
import { getElementContentWidth } from "./get-element-content-width"
export function newResponsiveSVG(config: {
  [key: string]: number | string,
  maxXCoord: number | string,
  maxYCoord: number | string,
  containerId: string
}): string | null {

  //return null if config undefined
  if (!config) {
    console.log("no config passed to newResponseSVG.  Returning null")
    return null
  }
  //throw/return null if maxXCoord or maxYCoord are not sane
  Array("maxXCoord", "maxYCoord").forEach((el) => {
    if (!config[el]) {
      console.log(`config passed to newResponsiveSVG is missing ${el}. Returning null.`)
      return null
    }
    if (!["string", "number"].includes(typeof config[el])) {
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


  const svgAspectRatio = xMaxNum / yMaxNum



  //create svg and set attributes
  const svgNamespace = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNamespace, "svg")
  const svgId = randomId()
  svg.setAttribute("id", svgId)
  svg.setAttribute("width", xMaxNum.toString())
  svg.setAttribute("height", yMaxNum.toString())
  svg.setAttribute("viewBox", `0 0 ${xMaxNum.toString()} ${yMaxNum.toString()}`)
  svg.setAttribute("preserveAspectRatio", "xMinYMid")



  //resize svg to current parent width
  const parent = document.getElementById(config.containerId)



  if (!parent) {
    console.log(`newResponsiveSVG cannot locate element with id ${config.containerId}`)
    return null
  }
  
  let pw = getElementContentWidth(parent)

  //note: pw will be 0 or negative if the parent is inline or has no styles defined on it.

  if (isNaN(pw)) {
    console.log(`newResponsiveSVG got NAN when it tried to get the width of ${parent}`)
    return null
  } else if (pw <= 0){
    console.log(`newResponsiveSVG got a 0 or negative value for the width of ${parent}`)
    return null
  } else {
    resizeSVG(svg, pw, svgAspectRatio)
    //set an event listener on the window that resizes the svg when called
    window.addEventListener("resize", () => {
      const parent = document.getElementById(config.containerId)
      if (!parent) {
        throw new Error(`We detected a window resize, and thus tried to resize an svg created with newResponseiveSVG.  But you passed the containerId ${config.containerId} to newResponsiveSVG and we cannot find an element in the document with that id.`)
      }
      let newpw = getElementContentWidth(parent)
      if (isNaN(newpw)) {
        throw new Error(`We detected a resize, and thus tried to resize an svg created with newResponseiveSVG. But got NAN when we tried to get the width of ${parent}`)
      } else if (newpw <= 0) {
        throw new Error(`We detected a resize, and thus tried to resize an svg created with newResponseiveSVG. But got 0 or a negative number when we tried to get the width of ${parent}`)
      } else {
        resizeSVG(svg, newpw, svgAspectRatio)
      }
    })


    //attach svg to the container
    parent.appendChild(svg)

    //return the id string of the svg
    return svgId
  }







}