import type { ProportionsMap, ResponsesSegmentMap, VerticalScale, Margin } from "./types";



export function makeVerticalScale(
  proportionsMap: ProportionsMap,
  segmentPadding: number,
  margin: Margin,
  vizHeight: number
): VerticalScale {
  const verticalScale: VerticalScale = new Map();
  Array.from(proportionsMap.keys()).forEach(group => {
    const responseScale: ResponsesSegmentMap = new Map();
    const arrayOfResponseGroups = Array.from(proportionsMap.get(group)?.keys() as Iterable<string[]>)
    const totalHeight = vizHeight - margin.top - margin.bottom - segmentPadding *(arrayOfResponseGroups.length - 1);
    for (let i = 0; i < arrayOfResponseGroups.length; i++){
      let top = margin.top
      if (
        i > 0 &&
        arrayOfResponseGroups &&
        arrayOfResponseGroups[i-1] &&
        responseScale &&
        responseScale.get(arrayOfResponseGroups[i-1])
      ) {
        const segment = responseScale.get(arrayOfResponseGroups[i-1]) as {top: number, height: number}
        top = segment.top + segment.height + segmentPadding
      }
      let p = 0
      if (
        proportionsMap &&
        proportionsMap.get(group) &&
        arrayOfResponseGroups[i] &&
        proportionsMap.get(group)?.get(arrayOfResponseGroups[i])
      )
      {
        p = proportionsMap.get(group)?.get(arrayOfResponseGroups[i]) as number
      }
      responseScale.set(arrayOfResponseGroups[i],
        {
          top: top,
          height: totalHeight*p
        }
      )  
    }
    verticalScale.set(group, responseScale);
  });
  return verticalScale;
}
