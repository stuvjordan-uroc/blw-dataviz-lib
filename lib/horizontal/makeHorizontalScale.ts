import type { ProportionsMap, ResponsesSegmentMap, HorizontalScale, Margin } from "./types";



export function makeHorizontalScale(
  proportionsMap: ProportionsMap,
  segmentPadding: number,
  margin: Margin,
  vizWidth: number
): HorizontalScale {
  const horizontalScale: HorizontalScale = new Map();
  Array.from(proportionsMap.keys()).forEach(group => {
    const responseScale: ResponsesSegmentMap = new Map();
    if (proportionsMap.get(group) === undefined || proportionsMap.get(group)?.keys() === undefined) {
      return null
    }
    const arrayOfResponseGroups = Array.from(proportionsMap.get(group)?.keys() as Iterable<string[]>)
    const totalWidth = vizWidth - margin.left - margin.right - segmentPadding *(arrayOfResponseGroups.length - 1);
    for (let i = 0; i < arrayOfResponseGroups.length; i++){
      let left = margin.left
      if (
        i > 0 &&
        arrayOfResponseGroups &&
        arrayOfResponseGroups[i-1] &&
        responseScale &&
        responseScale.get(arrayOfResponseGroups[i-1])
      ) {
        const segment = responseScale.get(arrayOfResponseGroups[i-1]) as {left: number, width: number}
        if (
          Object.hasOwn(segment, "left") &&
          Object.hasOwn(segment, "width")
        ) {
          left = segment.left + segment.width + segmentPadding
        }
      }
      let p = 0
      if (
        proportionsMap &&
        proportionsMap.get(group) &&
        arrayOfResponseGroups[i] &&
        proportionsMap.get(group)?.get(arrayOfResponseGroups[i])
      ) {
        p = proportionsMap.get(group)?.get(arrayOfResponseGroups[i]) as number
      }
      responseScale.set(arrayOfResponseGroups[i],
        {
          left: left,
          width: totalWidth*p
        }
      )  
    }
    horizontalScale.set(group, responseScale);
  });
  return horizontalScale;
}
