import type { Margin, HorizontalScale } from "./types"
interface DataRow {
  [key: string]: string
}
import { makeProportions } from "./makeProportions"
import { makeHorizontalScale } from "./makeHorizontalScale"
import { makeVerticalScale } from "./makeVerticalScale"

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
){
  if (segmentWidth < 0) {
    throw new Error("segmentWidth cannot be less than 0")
  }
  if (segmentVerticalPadding < 0) {
    throw new Error("segment vertical padding cannot be less than 0")
  }
  const proportions = makeProportions(data, responseKey, groupKey, groups, responses)
  const hScale: HorizontalScale = makeHorizontalScale(proportions, segmentWidth, margin, vizWidth)
  const vScale = makeVerticalScale(proportions, segmentVerticalPadding, margin, vizHeight)
  const getGroupArray = (group: string): Array<string> | undefined => {
     return groups.find(arrayOfGroups => arrayOfGroups.includes(group))
  }
  const X = (group: string): {xMin: number, xMax: number} | null => {
    const groupArray = getGroupArray(group)
    if (groupArray === undefined) {
      return null
    }
    const band = hScale.get(groupArray)
    if (band === undefined) {
      return null
    }
    return({
      xMin: band.left,
      xMax: band.left + band.width
    })
  }
  const getResponseArray = (response: string): Array<string> | undefined => {
    return responses.find(arrayOfResponses => arrayOfResponses.includes(response))
  }
  const Y = (group: string, response: string): {yMin: number, yMax: number} | null => {
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
    vScale: vScale,
    proportions: proportions
  })
}