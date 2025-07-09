import type { HorizontalConfig } from "./types"
import { hSegmentVizSanityCheck } from "./segVizSanityChecks"
import { makeProportions } from "../makeProportions"
import { makeVerticalScale } from "./makeVerticalScale"
import { makeHorizontalScale } from "./makeHorizontalScale"



export class HorizontalSegmentViz {
  //members
  P: (group: string, response: string) => number | null
  Y: (group: string) => { yTop: number, yBottom: number } | null
  X: (group: string, response: string) => { xLeft: number, xRight: number } | null
  //constructor
  constructor(config: HorizontalConfig) {
    hSegmentVizSanityCheck(config)
    const proportions = makeProportions(config.data, config.groups, config.responses, config.groupKey, config.responseKey)
    const getGroupArray = (groupString: string): Array<string> | undefined => {
      return config.groups.find(arrayOfGroups => arrayOfGroups.includes(groupString))
    }
    const getResponseArray = (response: string): Array<string> | undefined => {
      return config.responses.find(arrayOfResponses => arrayOfResponses.includes(response))
    }
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
    const vScale = makeVerticalScale(proportions, config.segmentHeight, config.margin, config.vizHeight)
    this.Y = (groupString: string) => {
      const groupArray = getGroupArray(groupString)
      if (groupArray === undefined) {
        return null
      }
      const band = vScale.get(groupArray)
      if (band === undefined){
        return null
      }
      return({
        yTop: band.top,
        yBottom: band.top + band.height
      })
    }
    const hScale = makeHorizontalScale(proportions, config.segmentHorizontalPadding, config.margin, config.vizWidth)
    this.X = (groupString, responseString) => {
      const groupArray = getGroupArray(groupString)
      const responseArray = getResponseArray(responseString)
      if (groupArray === undefined || responseArray === undefined) {
        return null
      }
      const segmentY = hScale.get(groupArray)
      if (segmentY === undefined) {
        return null
      }
      const segment = segmentY.get(responseArray)
      if (segment === undefined) {
        return null
      }
      return ({
        xLeft: segment.left,
        xRight: segment.left + segment.width
      })
    }
  }
}