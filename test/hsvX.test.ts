import { expect, test } from 'vitest'
import type { DataRow } from '../lib/segment/vertical/types'
import { HorizontalSegmentViz } from '../lib/main'


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

const hsv = new HorizontalSegmentViz({
  data: testData,
  groups: testGroups,
  responses: testResponses,
  groupKey: "group",
  responseKey: "response",
  vizWidth: 1020,
  vizHeight: 1020,
  margin: {top: 10, left: 10, bottom: 10, right: 10},
  segmentHorizontalPadding: 20,
  segmentHeight: 100
})

/*
In this case, the total width of the main plot area (i.e. total height
minus left and right margin) is 1000.

There are three response groups, and horizontal padding of 20.  So
two horizontal pads, each with a width of 20.

So the total segment height (not including padding) is 1000 - 2*20 = 960

So we should have:
*/

const correctX = {
  A: {
    w: {
      xLeft: 10, //margin.left === 10
      xRight: 10 + correctProportions.A.w * 960
    },
    x: {
      xLeft: 10 + correctProportions.A.w * 960 + 20,
      xRight: 10 + (correctProportions.A.w + correctProportions.A.x) * 960 + 20
    },
    y: {
      xLeft: 10 + (correctProportions.A.w + correctProportions.A.x) * 960 + 20 + 20,
      xRight: 10 + 960 + 20 + 20
    }
  },
  B: {
    w: {
      xLeft: 10, //margin.left === 10
      xRight: 10 + correctProportions.B.w * 960
    },
    x: {
      xLeft: 10 + correctProportions.B.w * 960 + 20,
      xRight: 10 + (correctProportions.B.w + correctProportions.B.x) * 960 + 20
    },
    y: {
      xLeft: 10 + (correctProportions.B.w + correctProportions.B.x) * 960 + 20 + 20,
      xRight: 10 + 960 + 20 + 20
    }
  },
  C: {
    w: {
      xLeft: 10, //margin.left === 10
      xRight: 10 + correctProportions.C.w * 960
    },
    x: {
      xLeft: 10 + correctProportions.C.w * 960 + 20,
      xRight: 10 + (correctProportions.C.w + correctProportions.C.x) * 960 + 20
    },
    y: {
      xLeft: 10 + (correctProportions.C.w + correctProportions.C.x) * 960 + 20 + 20,
      xRight: 10 + 960 + 20 + 20
    }
  }
}

Object.keys(correctX).forEach(groupString => {
  Object.keys(correctX[groupString]).forEach(responseString => {
    test(`X gives the correct xLeft at ${groupString} and ${responseString}`, () => {
      expect(hsv.X(groupString, responseString)?.xLeft).toBeCloseTo(correctX[groupString][responseString].xLeft)
    })
    test(`X gives the correct xRight at ${groupString} and ${responseString}`, () => {
      expect(hsv.X(groupString, responseString)?.xRight).toBeCloseTo(correctX[groupString][responseString].xRight)
    })
  })
})

test('X returns null at unknown group', () => {
  expect(hsv.X("unknown", "x")).toBeNull()
})
test('X returns null at unknown response', () => {
  expect(hsv.X("A", "unknown")).toBeNull()
})