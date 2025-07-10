import "./style.css"

import { newResponsiveSVG } from "../lib/main";

const containerClassString = "svg-frame"

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="${containerClassString}" class="svg-frame">
  </div>
`


const svgId = newResponsiveSVG({
  maxXCoord: 900,
  maxYCoord: 600,
  containerId: containerClassString
})

if (!svgId) {
  console.log("newResponsiveSVG failed!")
}

if (svgId) {
  const svgElement = document.getElementById(svgId)
  if (!svgElement) {
    console.log("cannot find svg appended by newResponsiveSVG")
  }
  if (svgElement) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    new Array(1000).fill(1).map((el) => ({
      x: Math.random()*900,
      y: Math.random()*600
    })).forEach((el) => {
      const c = document.createElementNS(svgNamespace,"circle")
      c.setAttribute("cx", el.x.toString(10))
      c.setAttribute("cy", el.y.toString(10))
      c.setAttribute("r", "10")
      c.setAttribute("stroke-width", "1")
      svgElement.appendChild(c)
    })
  }
}


