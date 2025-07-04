import type { Margin, HorizontalScale, HorizontalConfig, ProportionsMap, } from "./types"
interface DataRow {
  [key: string]: string
}
import { makeProportions } from "./makeProportions"
import { makeHorizontalScale } from "./makeHorizontalScale"
import { makeVerticalScale } from "./makeVerticalScale"


function vSegmentVizSanityCheck(config: HorizontalConfig) {
  //check that the groupKey and responseKey are present and strings as required
  if (
    config.groupKey === undefined || config.responseKey === undefined ||
    config.groupKey === null || config.responseKey === null ||
    !(typeof config.groupKey === "string") || !(typeof config.responseKey === "string")
  ) {
    throw new Error("groupKey and responseKey must be defined and included in config object passed to verticalSegmentViz constructor.")
  }
  //check that the data is defined, has the right structure,
  //and that the rows have properties groupKey and responseKey
  if (
    config.data === undefined || config.data === null ||
    !(Array.isArray(config.data)) ||
    !config.data.every(row => (
      row !== null && typeof row === 'object' &&
      Object.hasOwn(row, config.groupKey) && Object.hasOwn(row, config.responseKey)
    ))
  ) {
    throw new Error("The data passed to constructor of verticalSegmentViz is either undefined or null, or has at least one row that is null, not an object, or not an object with the responseKey and groupKey you passed.")
  }
  //check that the groups array is defined, correctly structured, and has valid entries
  if (
    config.groups === undefined || config.groups === null ||
    !(Array.isArray(config.groups)) ||
    config.groups.some(group => (
      group === null || !Array.isArray(group) ||
      group.some(entry => (
        entry === null || typeof entry !== "string"
      ))
    ))
  ) {
    throw new Error("The groups passed to the constructor of verticalSegmentViz is either undefined or null, or is not an array.  Or one or more of it's entries is not an array of strings. ")
  }
  //check that every group in the groups array has more than zero rows in data.
  config.groups.forEach(group => {
    if (!config.data.some(row => group.includes(row[config.groupKey]))) {
      throw new Error(`In the config you passed to the verticalSegmentViz constructor, there are zero rows in the data with property ${config.groupKey} contained in group ${group}`)
    }
  })
  //check that the entries of the groupArray are mutually exclusive
  const groupsAsSets = config.groups.map(group => (new Set(group)))
  for (let i = 0; i < config.groups.length - 1; i++) {
    for (let j = i + 1; j < config.groups.length; j++) {
      if (!groupsAsSets[i].isDisjointFrom(groupsAsSets[j])) {
        throw new Error(`The groups you passed to the verticalSegmentViz constructor are not mutually exclusive.`)
      }
    }
  }
  //check that the responses array is defined, correctly structured, and has valid entries
  if (
    config.responses === undefined || config.responses === null ||
    !(Array.isArray(config.responses)) ||
    config.responses.some(response => (
      response === null || !Array.isArray(response) ||
      response.some(entry => (
        entry === null || typeof entry !== "string"
      ))
    ))
  ) {
    throw new Error("The responses passed to the constructor of verticalSegmentViz is either undefined or null, or is not an array.  Or one or more of it's entries is not an array of strings. ")
  }
  //check that the response groups are exhaustive within each group
  config.groups.forEach(group => {
    const groupData = config.data.filter(row => group.includes(row[config.groupKey]))
    const excludedRows = groupData.filter(row => config.responses.every(responseGroup => !responseGroup.includes(row[config.responseKey]))).length
    if (excludedRows > 0) {
      throw new Error(`In the data you passed to the verticalSegmentViz constructor, there are rows in group ${group} that are not included in any of the response you passed to the config.`)
    }
  })
  //check that the response groups are mutually exclusive
  const responsesAsSets = config.responses.map(responseArray => (new Set(responseArray)))
  for (let i = 0; i < config.responses.length - 1; i++) {
    for (let j = i + 1; j < config.responses.length; j++) {
      if (!responsesAsSets[i].isDisjointFrom(responsesAsSets[j])) {
        throw new Error(`The responses you passed to the verticalSegmentViz constructor are not mutually exclusive.`)
      }
    }
  }
  //throw an error if any dimensions are null, undefined, or the wrong type
  if (
    config.margin === undefined || config.margin === null ||
    ["top", "right", "bottom", "left"].some(p => (
      !Object.hasOwn(config.margin, p) ||
      config.margin[p] === undefined ||
      config.margin[p] === null ||
      typeof config.margin[p] !== "number"
    )) ||
    config.vizWidth === undefined || config.vizWidth === null ||
    typeof config.vizWidth !== "number" ||
    config.vizHeight === undefined || config.vizHeight === null ||
    typeof config.vizHeight !== "number" ||
    config.segmentWidth === undefined || config.segmentWidth === null ||
    typeof config.segmentWidth !== "number" ||
    config.segmentVerticalPadding === undefined || config.segmentVerticalPadding === null ||
    typeof config.segmentVerticalPadding !== "number"
  ) {
    throw new Error("In the config you passed to the VerticalSegmentViz constructor, either margin is undefined, null, or does not have the required proporties, or one or more of the required properties are not numbers, or vizWidth, vizHeight, segmentWidth, or segmentHeight are null, undefined or not numbers.")
  }
  //check that there's enough vertical space
  if (
    config.vizHeight - (
      config.margin.top + config.margin.bottom +
      config.segmentVerticalPadding * config.responses.length
    ) <= 0
  ) {
    throw new Error(`In the config you passed to the verticalSegmentViz constructor, the margin.top plus the margin.bottom plus the vertical padding times (responses.length-1) exceeds the vizHeight.`)
  }

  //check that there's enough horizontal space
  if (
    config.vizWidth - (
      config.margin.left + config.margin.right +
      config.segmentWidth * config.groups.length
    ) < 0
  ) {
    throw new Error(`In the config you passed to the verticalSegmentViz constructor, the margin.left plus the margin.right plus the segmentWidth times groups.length exceeds the vizWidth.`)
  }
}

export class VerticalSegmentViz {
  //members
  #proportions: ProportionsMap
  config: HorizontalConfig
  P: (string, string) => number
  
  //constructor
  constructor(config: HorizontalConfig) {
    vSegmentVizSanityCheck(config)
    this.config = config
    this.#proportions = makeProportions(config.data, config.groups, config.responses, config.groupKey, config.responseKey)
    this.P = (group: string, response: string) => {
      const groupArray = getGroupArray(group)
      const responseArray = getResponseArray(response)
      if (groupArray === undefined || responseArray === undefined) {
        return null
      }
      const groupProp = proportions.get(groupArray)
      if (groupProp === undefined) {
        return null
      }
      const prop = groupProp.get(responseArray)
      if (prop === undefined) {
        return null
      }
      return prop
    }
  }
}

export function segmentViz(
  data: Array<DataRow>,
  groups: Array<Array<string>>,
  responses: Array<Array<string>>,
  groupKey: string,
  responseKey: string,
  margin: Margin,
  vizWidth: number,
  vizHeight: number,
  segmentWidth: number,
  segmentVerticalPadding: number
) {
  if (segmentWidth < 0) {
    throw new Error("segmentWidth cannot be less than 0")
  }
  if (segmentVerticalPadding < 0) {
    throw new Error("segment vertical padding cannot be less than 0")
  }
  const proportions = makeProportions(data, groups, responses, groupKey, responseKey)
  const hScale: HorizontalScale = makeHorizontalScale(proportions, segmentWidth, margin, vizWidth)
  const vScale = makeVerticalScale(proportions, segmentVerticalPadding, margin, vizHeight)
  const getGroupArray = (group: string): Array<string> | undefined => {
    return groups.find(arrayOfGroups => arrayOfGroups.includes(group))
  }
  const X = (group: string): { xMin: number, xMax: number } | null => {
    const groupArray = getGroupArray(group)
    if (groupArray === undefined) {
      return null
    }
    const band = hScale.get(groupArray)
    if (band === undefined) {
      return null
    }
    return ({
      xMin: band.left,
      xMax: band.left + band.width
    })
  }
  const getResponseArray = (response: string): Array<string> | undefined => {
    return responses.find(arrayOfResponses => arrayOfResponses.includes(response))
  }
  const Y = (group: string, response: string): { yMin: number, yMax: number } | null => {
    const groupArray = getGroupArray(group)
    const responseArray = getResponseArray(response)
    if (groupArray === undefined || responseArray === undefined) {
      return null
    }
    const segmentX = vScale.get(groupArray)
    if (segmentX === undefined) {
      return null
    }
    const segment = segmentX.get(responseArray)
    if (segment === undefined) {
      return null
    }
    return ({
      yMax: segment.top,
      yMin: segment.top + segment.height
    })
  }
  const P = (group: string, response: string) => {
    const groupArray = getGroupArray(group)
    const responseArray = getResponseArray(response)
    if (groupArray === undefined || responseArray === undefined) {
      return null
    }
    const groupProp = proportions.get(groupArray)
    if (groupProp === undefined) {
      return null
    }
    const prop = groupProp.get(responseArray)
    if (prop === undefined) {
      return null
    }
    return prop
  }
  return ({
    X: X,
    Y: Y,
    P: P,
    hScale: hScale,
    vScale: vScale,
    proportions: proportions
  })
}