import type { HorizontalConfig } from "./types"
import { hSegmentVizSanityCheck } from "./segVizSanityChecks"
import { makeProportions } from "../makeProportions"


export class HorizontalSegmentViz {
  //members
  P: (group: string, response: string) => number | null
  X: (group: string) => { xLeft: number, xRight: number } | null
  Y: (group: string, response: string) => { yTop: number, yBottom: number } | null
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
  }
}