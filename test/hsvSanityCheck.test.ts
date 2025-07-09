import { expect, test } from 'vitest'
import { HorizontalSegmentViz } from "../lib/main"
import { HorizontalConfig } from '../lib/segment/horizontal/types'

const testData = [
  {
    pid3: "Republican",
    meal: "Cheeseburger"
  },
  {
    pid3: "Republican",
    meal: "Cheeseburger"
  },
  {
    pid3: "Republican",
    meal: "Cheeseburger"
  },
  {
    pid3: "Independent",
    meal: "Cheeseburger"
  },
  {
    pid3: "Independent",
    meal: "Cheeseburger"
  },
  {
    pid3: "Independent",
    meal: "Hot dog"
  },
  {
    pid3: "Democrat",
    meal: "Hot dog"
  },
  {
    pid3: "Democrat",
    meal: "Hot dog"
  },
  {
    pid3: "Democrat",
    meal: "Hot dog"
  }
]

const validConfig: HorizontalConfig = {
  data: testData,
  groups: [["Democrat"], ["Independent"], ["Republican"]],
  responses: [["Cheeseburger"], ["Hot dog"]],
  groupKey: "pid3",
  responseKey: "meal",
  margin: { top: 100, right: 10, bottom: 100, left: 10 },
  vizWidth: 800,
  vizHeight: 800,
  segmentHeight: 150,
  segmentHorizontalPadding: 20
}

test("undefined groupKey throws an error", () => {
  const invalidConfig = {
    ...validConfig,
    groupKey: undefined
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("groupKey and responseKey must be defined")
})

test("undefined responseKey throws an error", () => {
  const invalidConfig = {
    ...validConfig,
    responseKey: undefined
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("groupKey and responseKey must be defined")
})

test("null groupKey throws an error", () => {
  const invalidConfig = {
    ...validConfig,
    groupKey: null
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("groupKey and responseKey must be defined")
})

test("null responseKey throws an error", () => {
  const invalidConfig = {
    ...validConfig,
    responseKey: null
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("groupKey and responseKey must be defined")
})

test("non-string groupKey throws an error", () => {
  const invalidConfig = {
    ...validConfig,
    groupKey: 1
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("groupKey and responseKey must be defined")
})

test("non-string responseKey throws an error", () => {
  const invalidConfig = {
    ...validConfig,
    responseKey: 1
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("groupKey and responseKey must be defined")
})

test("undefined data throws an error", () => {
  const invalidConfig = {
    ...validConfig,
    data: undefined
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("The data passed to constructor of HorizontalSegmentViz is either undefined or")
})

test("null data throws an error", () => {
  const invalidConfig = {
    ...validConfig,
    data: null
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("The data passed to constructor of HorizontalSegmentViz is either undefined or")
})

test("data that is not an array throws an error", () => {
  const invalidConfig = {
    ...validConfig,
    data: 1
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("The data passed to constructor of HorizontalSegmentViz is either undefined or")
})

test("data with a null row throws an error", () => {
  const badData = validConfig.data.concat([null])
  const invalidConfig = {
    ...validConfig,
    data: badData
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("The data passed to constructor of HorizontalSegmentViz is either undefined or")
})

test("data with a row that is not an object throws an error", () => {
  const badData = validConfig.data.concat([1])
  const invalidConfig = {
    ...validConfig,
    data: badData
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("The data passed to constructor of HorizontalSegmentViz is either undefined or")
})

test("data with a row that does not have the reponseKey throws an error", () => {
  const badData = validConfig.data.concat([{ pid3: "Republican" }])
  const invalidConfig = {
    ...validConfig,
    data: badData
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("The data passed to constructor of HorizontalSegmentViz is either undefined or")
})

test("data with a row that does not have the groupKey throws an error", () => {
  const badData = validConfig.data.concat([{ meal: "Cheeseburger" }])
  const invalidConfig = {
    ...validConfig,
    data: badData
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("The data passed to constructor of HorizontalSegmentViz is either undefined or")
})

test("undefined groups array throws an error", () => {
  const invalidConfig = {
    ...validConfig,
    groups: undefined
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("The groups passed to the constructor of HorizontalSegmentViz is")
})

test("null groups array throws an error", () => {
  const invalidConfig = {
    ...validConfig,
    groups: null
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("The groups passed to the constructor of HorizontalSegmentViz is")
})

test("groups array that is not an array throws an error", () => {
  const invalidConfig = {
    ...validConfig,
    groups: 1
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("The groups passed to the constructor of HorizontalSegmentViz is")
})

test("groups array containing a null group throws an error", () => {
  const invalidGroupArray = validConfig.groups.concat([null])
  const invalidConfig = {
    ...validConfig,
    groups: invalidGroupArray
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("The groups passed to the constructor of HorizontalSegmentViz is")
})

test("groups array containing a non-array group throws an error", () => {
  const invalidGroupArray = validConfig.groups.concat([1])
  const invalidConfig = {
    ...validConfig,
    groups: invalidGroupArray
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("The groups passed to the constructor of HorizontalSegmentViz is")
})

test("groups array containing a an array with a null entry throws an error", () => {
  const invalidGroupArray = validConfig.groups.concat([["Green", null]])
  const invalidConfig = {
    ...validConfig,
    groups: invalidGroupArray
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("The groups passed to the constructor of HorizontalSegmentViz is")
})

test("groups array containing a an array with a non-string entry throws an error", () => {
  const invalidGroupArray = validConfig.groups.concat([["Green", 1]])
  const invalidConfig = {
    ...validConfig,
    groups: invalidGroupArray
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("The groups passed to the constructor of HorizontalSegmentViz is")
})

test("groups array containing a entry with zero rows in the data throws an error", () => {
  const invalidGroupArray = validConfig.groups.concat([["Green"]])
  const invalidConfig = {
    ...validConfig,
    groups: invalidGroupArray
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("In the config you passed to the HorizontalSegmentViz constructor, there are zero")
})

test("groups array with overlapping entries throws an error", () => {
  const invalidGroupArray = [["Independent", "Republican"], ["Democrat", "Republican"]]
  const invalidConfig = {
    ...validConfig,
    groups: invalidGroupArray
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("The groups you passed to the HorizontalSegmentViz constructor are not mutually exclusive.")
})

test("undefined responses array throws an error", () => {
  const invalidConfig = {
    ...validConfig,
    responses: undefined
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("The responses passed to the constructor of HorizontalSegmentViz is either")
})

test("null responses array throws an error", () => {
  const invalidConfig = {
    ...validConfig,
    responses: null
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("The responses passed to the constructor of HorizontalSegmentViz is either")
})

test("Responses array that is not an array throws and error", () => {
  const invalidConfig = {
    ...validConfig,
    responses: 1
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("The responses passed to the constructor of HorizontalSegmentViz is either")
})

test("Responses array with a null entry throws and error", () => {
  const invalidResonsesArray = validConfig.responses.concat(null)
  const invalidConfig = {
    ...validConfig,
    responses: invalidResonsesArray
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("The responses passed to the constructor of HorizontalSegmentViz is either")
})

test("Responses array with a non-array entry throws and error", () => {
  const invalidResonsesArray = validConfig.responses.concat(1)
  const invalidConfig = {
    ...validConfig,
    responses: invalidResonsesArray
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("The responses passed to the constructor of HorizontalSegmentViz is either")
})

test("Responses array with an entry that contains a null throws and error", () => {
  const invalidResonsesArray = validConfig.responses.concat(["Veggie burger", null])
  const invalidConfig = {
    ...validConfig,
    responses: invalidResonsesArray
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("The responses passed to the constructor of HorizontalSegmentViz is either")
})

test("Responses array with an entry that contains a non-string throws and error", () => {
  const invalidResonsesArray = validConfig.responses.concat(["Veggie burger", 1])
  const invalidConfig = {
    ...validConfig,
    responses: invalidResonsesArray
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("The responses passed to the constructor of HorizontalSegmentViz is either")
})

test("Responses array that is not exhaustive within one or more groups throws an error", () => {
  const invalidConfig = {
    ...validConfig,
    responses: [["Hot dog"]]
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("In the data you passed to the HorizontalSegmentViz constructor, there are rows in group")
})

test("responses array with overlapping entries throws an error", () => {
  const invalidResponseArray = [["Cheeseburger", "Hot dog"], ["Hot dog", "Cheeseburger"]]
  const invalidConfig = {
    ...validConfig,
    responses: invalidResponseArray
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("The responses you passed to the HorizontalSegmentViz constructor are not mutually exclusive.")
})

test("undefined margin throws an error", () => {
  const invalidConfig = {
    ...validConfig,
    margin: undefined
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("In the config you passed to the HorizontalSegmentViz constructor, either margin is")
})

test("null margin throws an error", () => {
  const invalidConfig = {
    ...validConfig,
    margin: null
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("In the config you passed to the HorizontalSegmentViz constructor, either margin is")
})

test("missing margin property throws an error", () => {
  const invalidConfig = {
    ...validConfig,
    margin: { top: 10, right: 10, bottom: 10 }
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("In the config you passed to the HorizontalSegmentViz constructor, either margin is")
})

test("undefined margin property throws an error", () => {
  const invalidConfig = {
    ...validConfig,
    margin: { top: 10, right: 10, bottom: 10, left: undefined }
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("In the config you passed to the HorizontalSegmentViz constructor, either margin is")
})

test("null margin property throws an error", () => {
  const invalidConfig = {
    ...validConfig,
    margin: { top: 10, right: 10, bottom: 10, left: null }
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("In the config you passed to the HorizontalSegmentViz constructor, either margin is")
})

test("non-number margin property throws an error", () => {
  const invalidConfig = {
    ...validConfig,
    margin: { top: 10, right: 10, bottom: 10, left: "10" }
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("In the config you passed to the HorizontalSegmentViz constructor, either margin is")
})


Array("vizWidth", "vizHeight", "segmentHeight", "segmentHorizontalPadding").forEach(param => {
  test(`undefined ${param} throws an error`, () => {
    const invalidConfig = {
      ...validConfig,
      [param]: undefined
    }
    expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("In the config you passed to the HorizontalSegmentViz constructor, either margin is")
  })
  test(`null ${param} throws an error`, () => {
    const invalidConfig = {
      ...validConfig,
      [param]: null
    }
    expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("In the config you passed to the HorizontalSegmentViz constructor, either margin is")
  })
  test(`non-number ${param} throws an error`, () => {
    const invalidConfig = {
      ...validConfig,
      [param]: "some string"
    }
    expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("In the config you passed to the HorizontalSegmentViz constructor, either margin is")
  })
})

test("not enough horizontal space throws an error", () => {
  const invalidConfig = {
    ...validConfig,
    margin: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    },
    vizWidth: 10,
    vizHeight: 100,
    segmentHeight: 10,
    segmentHorizontalPadding: 10
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("In the config you passed to the HorizontalSegmentViz constructor, the margin.left plus the margin.right plus")
})

test("not enough vertical space throws an error", () => {
  const invalidConfig = {
    ...validConfig,
    margin: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    },
    vizHeight: 10,
    vizWidth: 100,
    segmentHeight: 10,
    segmentHorizontalPadding: 10
  }
  expect(() => new HorizontalSegmentViz(invalidConfig)).toThrow("In the config you passed to the HorizontalSegmentViz constructor, the margin.top plus the margin.bottom plus the segmentHeight times ")
})