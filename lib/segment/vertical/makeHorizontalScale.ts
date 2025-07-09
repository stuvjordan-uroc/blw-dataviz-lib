import type { HorizontalScale, Margin, ProportionsMap } from "./types";

export function makeHorizontalScale(
  proportions: ProportionsMap, 
  bandwidth: number, 
  margin: Margin, 
  vizWidth: number
): HorizontalScale {
  const groupsArray = Array.from(proportions.keys());
  const blankSpace = vizWidth - margin.left - margin.right - (groupsArray.length * bandwidth)
  const padding = blankSpace / (groupsArray.length - 1)
  const horizontalScale: HorizontalScale = new Map()
  for (let i = 0; i < groupsArray.length; i++) {
    let left = margin.left
    if(
      i > 0 &&
      groupsArray &&
      groupsArray[i-1] &&
      horizontalScale &&
      horizontalScale.get(groupsArray[i-1])
    ){
      let segment = horizontalScale.get(groupsArray[i-1]) as {left: number, width: number}
      left = segment.left + segment.width + padding
    }
    horizontalScale.set(groupsArray[i], {
      left: left,
      width: bandwidth
    })
  }
  return horizontalScale
}