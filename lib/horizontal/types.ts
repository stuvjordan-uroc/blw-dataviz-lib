export interface DataRow {
  [key: string]: string
}
export interface Margin {
  [index: string]: number;
  top: number;
  right: number;
  bottom: number;
  left: number
}
export interface HorizontalConfig {
  data: Array<DataRow>,
  groups: Array<Array<string>>,
  responses: Array<Array<string>>,
  groupKey: string,
  responseKey: string,
  margin: Margin,
  vizWidth: number,
  vizHeight: number,
  segmentHeight: number,
  segmentHorizontalPadding: number
}
export type ResponsesProportionMap = Map<Array<string>, number>;
export type ProportionsMap = Map<Array<string>, ResponsesProportionMap>;
