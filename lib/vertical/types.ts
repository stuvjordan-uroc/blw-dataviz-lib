export type ResponsesProportionMap = Map<Array<string>, number>;
export type ProportionsMap = Map<Array<string>, ResponsesProportionMap>;
export interface Segment {
  top: number;
  height: number;
}
export interface DataRow {
  [key: string]: string
}
export type ResponsesSegmentMap = Map<Array<string>, Segment>;
export type VerticalScale = Map<Array<string>, ResponsesSegmentMap>;
export interface Margin {
  [index: string]: number;
  top: number;
  right: number;
  bottom: number;
  left: number
}
export interface Band {
  left: number;
  width: number;
}
export type HorizontalScale = Map<Array<string>,Band>
export interface VerticalConfig {
  data: Array<DataRow>, 
  groups: Array<Array<string>>, 
  responses: Array<Array<string>>, 
  groupKey: string, 
  responseKey: string,
  margin: Margin, 
  vizWidth: number, 
  vizHeight: number,
  segmentWidth: number,
  segmentVerticalPadding: number
}
