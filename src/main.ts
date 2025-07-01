import { segmentViz } from "../lib/main"

//example data

const exampleGroups = ["Democrat", "Independent", "Republican"];
const exampleResponses = [
  "Definitely not the rightful winner",
  "Probably not the rightful winner",
  "Probably the rightful winner",
  "Definitely the rightful winner",
];

const exampleData: Array<{ bidenWinner: string; pid3: string }> = new Array(100)
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
  "bidenWinner",
  "pid3",
  margin,
  frameWidth,
  frameHeight,
  -30 + (frameWidth - margin.left - margin.right)/3.0,
  20
)
console.log(viz)


