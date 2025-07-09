import { newResponsiveSVG } from "../lib/main";

const svgId = newResponsiveSVG({
  maxXCoord: 900,
  maxYCoord: 600,
  containerId: "svg-frame"
})

if (!svgId) {
  console.log("newResponsiveSVG failed!")
}

if (svgId) {
  const svgElement = document.getElementById(svgId)
  if (!svgElement) {
    console.log("cannot find svg appended y newResponsiveSVG")
  }
  if (svgElement) {
    console.log("putting circles into svg")
    new Array(10).fill(1).map((el) => ({
      x: Math.random()*900,
      y: Math.random()*600
    })).forEach((el) => {
      const c = document.createElement("circle")
      console.log(c)
      c.setAttribute("cx", el.x.toString())
      c.setAttribute("cy", el.y.toString())
      c.setAttribute("fill", "green")
      c.setAttribute("r", "10")
      svgElement.appendChild(c)
    })
  }
}


