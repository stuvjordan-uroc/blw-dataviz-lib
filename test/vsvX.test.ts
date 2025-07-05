import { expect, test } from 'vitest'
import type { DataRow } from '../lib/vertical/types'
import { VerticalSegmentViz } from '../lib/vertical/segmentViz'


interface CorrectProportions {
  A: {
    w: number,
    x: number,
    y: number
  },
  B: {
    w: number,
    x: number,
    y: number
  },
  C: {
    w: number,
    x: number,
    y: number
  }
}

//group A will have 1 "w", 4 "x", 5 "y"
const aData = new Array(10).fill(1).map((el, idx) => {
  if (idx <= 0) {
    return Array("A", "w")
  }
  if (idx <= 4) {
    return Array("A", "x")
  }
  return Array("A", "y")
}).map(function (el: string[]): DataRow {
  return ({
    group: el[0],
    response: el[1]
  })
})
let correctProportions: CorrectProportions = {
  A: {
    w: 1 / 10,
    x: 4 / 10,
    y: 5 / 10
  }
}

//group B will have 2 "w", 5 "x", 3 "y"
let bData = new Array(10).fill(1).map((el, idx) => {
  if (idx <= 1) {
    return Array("B", "w")
  }
  if (idx <= 6) {
    return Array("B", "x")
  }
  return Array("B", "y")
}).map(function (el: string[]): DataRow {
  return ({
    group: el[0],
    response: el[1]
  })
})

correctProportions = {
  ...correctProportions,
  B: {
    w: 2 / 10,
    x: 5 / 10,
    y: 3 / 10
  }
}


//group C will have 6 "w", 2 "x", 2 "y"
let cData = new Array(10).fill(1).map((el, idx) => {
  if (idx <= 5) {
    return Array("C", "w")
  }
  if (idx <= 7) {
    return Array("C", "x")
  }
  return Array("C", "y")
}).map(function (el: string[]): DataRow {
  return ({
    group: el[0],
    response: el[1]
  })
})

correctProportions = {
  ...correctProportions,
  C: {
    w: 6 / 10,
    x: 2 / 10,
    y: 2 / 10
  }
}

const testData = aData.concat(bData).concat(cData)
const testGroups = ['A', 'B', 'C'].map((el) => Array(el))
const testResponses = ['w', 'x', 'y'].map((el) => Array(el))

const vsv = new VerticalSegmentViz({
  data: testData,
  groups: testGroups,
  responses: testResponses,
  groupKey: "group",
  responseKey: "response",
  vizWidth: 1020,
  vizHeight: 1000,
  margin: {top: 10, left: 10, bottom: 10, right: 10},
  segmentVerticalPadding: 20,
  segmentWidth: 100
})

//in this test case, vizWidth - margin.left - margin.right = 1000
//so with segmentWidth = 100, and three groups, we should have
//2 pads between the three columns of (1000-300)/2 = 350

const correctX = {
  A: {
    xMin: 10,
    xMax: 110
  },
  B: {
    xMin: 460,
    xMax: 560
  },
  C: {
    xMin: 910,
    xMax: 1010
  }
}

Object.keys(correctX).forEach(groupString => {
  test(`X gives the correct xLeft at ${groupString}`, () => {
    expect(vsv.X(groupString)?.xLeft).toBeCloseTo(correctX[groupString].xMin)
  })
  test(`X gives the correct xRight at ${groupString}`, () => {
    expect(vsv.X(groupString)?.xRight).toBeCloseTo(correctX[groupString].xMax)
  })
})

test("X returns null at unknown group", () => {
  expect(vsv.X("unknown")).toBeNull()
})