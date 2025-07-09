import { expect, test } from 'vitest'
import { makeProportions } from "../lib/segment/makeProportions"
import type { DataRow } from '../lib/segment/vertical/types'


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
const testProportions = makeProportions(
  testData,
  testGroups,
  testResponses,
  "group",
  "response"
)
testGroups.forEach(groupArray => {
  testResponses.forEach(responseArray => {
    test(`Should have the correct proportion for group ${groupArray[0]} and response ${responseArray[0]}`, () => {
      expect(testProportions.get(groupArray)?.get(responseArray)).toBeCloseTo(correctProportions[groupArray[0]][responseArray[0]])
    })
  })
})