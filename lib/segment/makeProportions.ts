type ResponsesProportionMap = Map<Array<string>, number>;
type ProportionsMap = Map<Array<string>, ResponsesProportionMap>;


export function makeProportions(
  data: Array<{ [key: string]: string }>,
  groups: Array<Array<string>>,
  responses: Array<Array<string>>,
  groupKey: string,
  responseKey: string
): ProportionsMap {
  const proportionsMap = new Map();
  groups.forEach(groupArray => {
    const groupMap = new Map();
    const groupCount = data.filter(row => groupArray.includes(row[groupKey])).length;
    if (groupCount === 0) {
      throw new Error(`There are no rows in the data with values at key ${groupKey} in array ${groupArray}`)
    }
    responses.forEach(responseArray => {
      const responseCount = data.filter(row => (
        responseArray.includes(row[responseKey]) && groupArray.includes(row[groupKey])
      )).length
      groupMap.set(
        responseArray,
        responseCount / groupCount
      );
    });
    proportionsMap.set(groupArray, groupMap);
  });
  return proportionsMap;
}
