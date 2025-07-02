import { segmentViz } from "../lib/main"


//example data

const exampleGroups = ["Democrat", "Independent", "Republican"];
const exampleResponses = [
  "Definitely not the rightful winner",
  "Probably not the rightful winner",
  "Probably the rightful winner",
  "Definitely the rightful winner",
];
/*
const exampleData: Array<{ [key: string]: string }> = new Array(1000)
  .fill(1)
  .map(el => ({
    bidenWinner: exampleResponses[Math.floor(Math.random() * exampleResponses.length)],
    pid3: exampleGroups[Math.floor(Math.random() * exampleGroups.length)],
  }));
*/
const exampleData = new Array()
for (let i = 0; i < exampleGroups.length; i++) {
  new Array(1000).fill(1).forEach((el) => {
    exampleData.push({
      bidenWinner: (Math.random() < (i+1)*0.25) ? 
      (Math.random() < 0.5) ? "Definitely not the rightful winner" : "Probably not the rightful winner" :
      (Math.random() < 0.5) ? "Probably the rightful winner" : "Definitely the rightful winner",
      pid3: exampleGroups[i]
    })
  })
}
//set up the groups and responses for the plot

const groups = [["Democrat"], ["Independent"], ["Republican"]];
const responses = [
  ["Definitely the rightful winner", "Probably the rightful winner"],
  ["Probably not the rightful winner", "Definitely not the rightful winner"],
];

//wait for load to finish, so styles are set, etc


const frame = d3.select("#svg-frame")
//hardcoding the height and width, because I can't seem to get css to load before js in vite dev server
//const frameWidth = parseFloat(frame.style("width"))
//const frameHeight = parseFloat(frame.style("height"))
const frameWidth = 1000
const frameHeight = 562
const svg = frame.append("svg")
  .attr("width", "1000")
  .attr("height", "562")

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
  -30 + (frameWidth - margin.left - margin.right) / 3.0,
  40
)

//test with jittered points
svg.selectAll("circle")
  .data(exampleData)
  .join("circle")
    .attr("class", d => d.pid3.toLowerCase())
    .attr("cx", d => viz.X(d.pid3)?.xMin + Math.random()*(viz.X(d.pid3)?.xMax - viz.X(d.pid3)?.xMin))
    .attr("cy", d => viz.Y(d.pid3,d.bidenWinner)?.yMin + Math.random()*(viz.Y(d.pid3,d.bidenWinner)?.yMax - viz.Y(d.pid3,d.bidenWinner)?.yMin))


