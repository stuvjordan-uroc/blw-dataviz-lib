import { segmentViz } from "../lib/main"


//example data

const exampleGroups = ["Democrat", "Independent", "Republican"];
const exampleResponses = [
  "Definitely not the rightful winner",
  "Probably not the rightful winner",
  "Probably the rightful winner",
  "Definitely the rightful winner",
];

const exampleData: Array<{[key: string]: string}> = new Array(100)
  .fill(1)
  .map(el => ({
    bidenWinner: exampleResponses[Math.floor(Math.random() * exampleResponses.length)],
    pid3: exampleGroups[Math.floor(Math.random() * exampleGroups.length)],
  }));

//set up the groups and responses for the plot

const groups = [["Democrat"], ["Independent"], ["Republican"]];
const responses = [
  ["Definitely the rightful winner", "Probably the rightful winner"],
  ["Probably not the rightful winner", "Definitely not the rightful winner"],
];

//append the svg and get the width and height

const frame = d3.select("#svg-frame")
const frameWidth = parseFloat(frame.style("width"))
const frameHeight = parseFloat(frame.style("height"))
console.log("frameWidth:", frameWidth)
console.log("frameHeight:", frameHeight)
const svg = frame.append("svg")
  .attr("width", "100%")
  .attr("height", "100%")

//set the margin object
const margin = { top: 10, right: 120, bottom: 10, left: 120 };

//make the viz object

const viz = segmentViz(
  exampleData,
  groups,
  responses,
  "pid3",
  "bidenWinner",
  margin,
  frameWidth,
  frameHeight,
  -30 + (frameWidth - margin.left - margin.right)/3.0,
  20
)

//test the viz object on a few points
//console.log("X at Independent:", viz.X("Independent"))
//console.log("Y at Indenepdent, Probably not the rightful winner", viz.Y("Independent", "Probably not the rightful winner"))
console.log("here is the hScale:", viz.hScale)
//console.log("here is the vScale:", viz.vScale)
//console.log("here are the proportions:", viz.proportions)
//make the selection of points
/*
const pointsSelection = svg.selectAll("circle")
  .data(exampleData)
  .join("circle")
    .attr("class", (d: ExampleDataPoint,idx: number) => {
      switch(d.pid3) {
        case "Democrat":
          return("democrat")
          break;
        case "Independent":
          return("independent")
          break;
        case "Republican":
          return("republican")
          break;
        default:
          throw new Error(`data point at index ${idx} has an invalid pid3`)
      }
    })
    .attr("cx", (d: ExampleDataPoint) => {
      const min = viz.X(d.pid3)?.xMin
      const max = viz.X(d.pid3)?.xMax
      if (min === undefined || max === undefined){
        return "none"
      }
      return (min + Math.random()*(max-min))
    })
    .attr("cy", (d: ExampleDataPoint) => {
      const min = viz.Y(d.pid3, d.bidenWinner)?.yMin
      const max = viz.Y(d.pid3, d.bidenWinner)?.yMax
      if (min === undefined || max === undefined){
        return "none"
      }
      return(min + Math.random()*(max-min))
    })

console.log(pointsSelection)
*/

