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
    const arrayOfResponseGroups = Array.from(proportionsMap.get(group)?.keys())
    const totalHeight = vizHeight - margin.top - margin.bottom - segmentPadding *(arrayOfResponseGroups.length - 1);
    for (let i = 0; i < arrayOfResponseGroups.length; i++){
      const top = (i === 0) ? margin.top : responseScale.get(arrayOfResponseGroups[i-1]).top + responseScale.get(arrayOfResponseGroups[i-1]).height + segmentPadding
      responseScale.set(arrayOfResponseGroups[i],
        {
          top: top,
          height: totalHeight*proportionsMap.get(group)?.get(arrayOfResponseGroups[i])
        }
      )  
    }
    verticalScale.set(group, responseScale);
  });
  return verticalScale;
}
