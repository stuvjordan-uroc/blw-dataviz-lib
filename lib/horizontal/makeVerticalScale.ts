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
    let top = margin.top
    if (
      i > 0 &&
      groupsArray[i-1] &&
      verticalScale &&
      verticalScale.get(groupsArray[i-1])
    ){
      const segment = verticalScale.get(groupsArray[i-1]) as {top: number, height: number}
      top = segment.top + segment.height + padding
    }
    verticalScale.set(groupsArray[i], {
      top: top,
      height: bandheight
    })
  }
  return verticalScale
}