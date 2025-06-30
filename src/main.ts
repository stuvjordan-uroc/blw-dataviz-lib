import { makeProportions, makeVerticalScale } from "../lib/main"

const testGroups = ["Democrat", "Independent", "Republican"];
const testResponses = [
  "Definitely not the rightful winner",
  "Probably not the rightful winner",
  "Probably the rightful winner",
  "Definitely the rightful winner",
];

const testData: Array<{ bidenWinner: string; pid3: string }> = new Array(100)
  .fill(1)
  .map(el => ({
    bidenWinner:
      testResponses[Math.floor(Math.random() * testResponses.length)],
    pid3: testGroups[Math.floor(Math.random() * testGroups.length)],
  }));

const groups = [["Democrat"], ["Independent"], ["Republican"]];
const responses = [
  ["Definitely the rightful winner", "Probably the rightful winner"],
  ["Probably not the rightful winner", "Definitely not the rightful winner"],
];
const proportions = makeProportions(
  testData,
  "bidenWinner",
  "pid3",
  groups,
  responses
);
const margin = { top: 10, right: 120, bottom: 10, left: 120 };
const verticalScale = makeVerticalScale(proportions, 20, margin, 500);

console.log("proportions:", proportions);
console.log("vertical scale:", verticalScale);
