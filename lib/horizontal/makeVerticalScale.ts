import type { VerticalScale, Margin, ProportionsMap } from "./types";

export function makeVerticalScale(
  proportions: ProportionsMap, 
  bandheight: number, 
  margin: Margin, 
  vizHeight: number
): VerticalScale {
  const groupsArray = Array.from(proportions.keys());
  const blankSpace = vizHeight - margin.top - margin.bottom - (groupsArray.length * bandheight)
  const padding = blankSpace / (groupsArray.length - 1)
  const verticalScale: VerticalScale = new Map()
  for (let i = 0; i < groupsArray.length; i++) {
    verticalScale.set(groupsArray[i], {
      top: (i === 0) ? margin.top : verticalScale.get(groupsArray[i - 1]).top + verticalScale.get(groupsArray[i - 1]).height + padding,
      height: bandheight
    })
  }
  return verticalScale
}