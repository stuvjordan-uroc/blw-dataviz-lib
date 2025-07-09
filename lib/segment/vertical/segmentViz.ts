import type { VerticalConfig } from "./types"
import { makeProportions } from "../makeProportions"
import { makeHorizontalScale } from "./makeHorizontalScale"
import { makeVerticalScale } from "./makeVerticalScale"
import { vSegmentVizSanityCheck } from "./segVizSanityChecks"




export class VerticalSegmentViz {
  //members
  P: (group: string, response: string) => number | null
  X: (group: string) => { xLeft: number, xRight: number } | null
  Y: (group: string, response: string) => { yTop: number, yBottom: number } | null
  //constructor
  constructor(config: VerticalConfig) {
    vSegmentVizSanityCheck(config)
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
    const hScale = makeHorizontalScale(proportions, config.segmentWidth, config.margin, config.vizWidth)
    this.X = (groupString) => {
      const groupArray = getGroupArray(groupString)
      if (groupArray === undefined) {
        return null
      }
      const band = hScale.get(groupArray)
      if (band === undefined) {
        return null
      }
      return ({
        xLeft: band.left,
        xRight: band.left + band.width
      })
    }
    const vScale = makeVerticalScale(proportions, config.segmentVerticalPadding, config.margin, config.vizHeight)
    this.Y = (groupString, responseString) => {
      const groupArray = getGroupArray(groupString)
      const responseArray = getResponseArray(responseString)
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
        yTop: segment.top,
        yBottom: segment.top + segment.height
      })
    }
  }
}

