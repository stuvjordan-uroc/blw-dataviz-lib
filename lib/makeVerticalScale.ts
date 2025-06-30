import type { ProportionsMap, ResponsesSegmentMap, VerticalScale, Margin } from "./types";



export function makeVerticalScale(
  proportionsMap: ProportionsMap,
  segmentPadding: number,
  margin: Margin,
  vizHeight: number
): VerticalScale {
  const verticalScale: VerticalScale = new Map();
  proportionsMap.keys().forEach(group => {
    const responseScale: ResponsesSegmentMap = new Map();
    const responseArray = Array.from(proportionsMap.get(group)?.keys())
    const totalHeight =
      vizHeight -
      margin.top -
      margin.bottom -
      segmentPadding *
      (responseArray.length - 1);
    for (let i = 0; i < responseArray.length; i++) {
      responseScale.set(responseArray[i], {
        top:
          i === 0
            ? margin.top
            : responseScale.get(responseArray[i - 1]).top +
            responseScale.get(responseArray[i - 1]).height +
            segmentPadding,
        height: proportionsMap.get(group).get(responseArray[i]) * totalHeight,
      });
    }
    verticalScale.set(group, responseScale);
  });
  return verticalScale;
}
