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
  vizHeight: 1020,
  margin: {top: 10, left: 10, bottom: 10, right: 10},
  segmentVerticalPadding: 20,
  segmentWidth: 100
})

/*
In this case, the total height of the main plot area (i.e. total height
minus top and bottom margin) is 1000.

There are three response groups, and vertical padding of 20.  So
two vertical pads with a total height of 40.

So the total segment height (not including padding) is 960

So we should have:
*/

const correctY = {
  A: {
    w: {
      yMax: 10,
      yMin: 10 + correctProportions.A.w * 960
    },
    x: {
      yMax: 10 + correctProportions.A.w * 960 + 20,
      yMin: 10 + (correctProportions.A.w + correctProportions.A.x) * 960 + 20
    },
    y: {
      yMax: 10 + (correctProportions.A.w + correctProportions.A.x) * 960 + 40,
      yMin: 10 + 960 + 40
    }
  }
}

Object.keys(correctY).forEach(groupString => {
  Object.keys(correctY[groupString]).forEach(responseString => {
    test(`Y gives the correct yTop at ${groupString} and ${responseString}`, () => {
      expect(vsv.Y(groupString, responseString)?.yTop).toBeCloseTo(correctY[groupString][responseString].yMax)
    })
    test(`Y gives the correct yBottom at ${groupString} and ${responseString}`, () => {
      expect(vsv.Y(groupString, responseString)?.yBottom).toBeCloseTo(correctY[groupString][responseString].yMin)
    })
  })
})

test('Y returns null at unknown group', () => {
  expect(vsv.Y("unknown", "x")).toBeNull()
})
test('Y returns null at unknown response', () => {
  expect(vsv.Y("A", "unknown")).toBeNull()
})