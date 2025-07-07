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
    const arrayOfResponseGroups = Array.from(proportionsMap.get(group)?.keys())
    const totalWidth = vizWidth - margin.left - margin.right - segmentPadding *(arrayOfResponseGroups.length - 1);
    for (let i = 0; i < arrayOfResponseGroups.length; i++){
      const left = (i === 0) ? margin.left : responseScale.get(arrayOfResponseGroups[i-1]).left + responseScale.get(arrayOfResponseGroups[i-1]).width + segmentPadding
      responseScale.set(arrayOfResponseGroups[i],
        {
          left: left,
          width: totalWidth*proportionsMap.get(group)?.get(arrayOfResponseGroups[i])
        }
      )  
    }
    horizontalScale.set(group, responseScale);
  });
  return horizontalScale;
}
