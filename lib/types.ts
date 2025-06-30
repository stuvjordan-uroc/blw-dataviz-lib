export type ResponsesProportionMap = Map<Array<string>, number>;
export type ProportionsMap = Map<Array<string>, ResponsesProportionMap>;
export interface Segment {
  top: number;
  height: number;
}
export type ResponsesSegmentMap = Map<Array<string>, Segment>;
export type VerticalScale = Map<Array<string>, ResponsesSegmentMap>;
export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
export interface Band {
  left: number;
  width: number;
}
export type HorizontalScale = Map<Array<string>,Band>