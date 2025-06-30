type ResponsesProportionMap = Map<Array<string>, number>;
type ProportionsMap = Map<Array<string>, ResponsesProportionMap>;
interface Segment {
  top: number;
  height: number;
}
type ResponsesSegmentMap = Map<Array<string>, Segment>;
type VerticalScale = Map<Array<string>, ResponsesSegmentMap>;
interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export function makeVerticalScale(
  proportionsMap: ProportionsMap,
  segmentPadding: number,
  margin: Margin,
  vizHeight: number
): VerticalScale {
  const verticalScale: VerticalScale = new Map();
  proportionsMap.keys().forEach(group => {
    const responseScale: ResponsesSegmentMap = new Map();
    const totalHeight =
      vizHeight -
      segmentPadding *
        (Array.from(proportionsMap.get(group).keys()).length - 1);
    const responseArray = Array.from(proportionsMap.get(group)?.keys());
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
