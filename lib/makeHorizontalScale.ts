import type { HorizontalScale, Margin, ProportionsMap } from "./types";

export function makeHorizontalScale(proportions: ProportionsMap, bandwidth: number, margin: Margin, vizWidth: number): HorizontalScale {
  const groupsArray = Array.from(proportions.keys());
  if (vizWidth - margin.left - margin.right < groupsArray.length * bandwidth) {
    throw new Error("You called makeHorizontal scale with a vizWidth thats too small, given the margins and bandwidth")
  }
  const padding = (vizWidth - margin.left - margin.right - groupsArray.length * bandwidth)/(groupsArray.length - 1)
  const horizontalScale: HorizontalScale = new Map()
  for (let i = 0; i < groupsArray.length; i++) {
    horizontalScale.set(groupsArray[i], {
      left: (i === 0) ? margin.left : horizontalScale.get(groupsArray[i-1]).left + horizontalScale.get(groupsArray[i-1]).width + padding,
      width: bandwidth
    })
  }
  return horizontalScale
}