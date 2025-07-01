import type { ProportionsMap } from "./types";


export function makeProportions(
  data: Array<{ [key: string]: string }>,
  responseKey: string,
  groupKey: string,
  groups: Array<Array<string>>,
  responses: Array<Array<string>>
): ProportionsMap {
  const proportionsMap = new Map();
  groups.forEach(groupArray => {
    console.log("calculating proportions for group:", groupArray)
    const groupMap = new Map();
    const groupCount = data.filter(row => {
      if (!row.hasOwnProperty(groupKey)) {
        throw new Error(
          `You called makeProportions and passed group key ${groupKey}. But there is a row in your data that does not have ${groupKey} as a key.`
        );
      }
      return groupArray.includes(row[groupKey]);
    }).length;
    console.log("This group's count is:", groupCount)
    responses.forEach(responseArray => {
      console.log("working on response array:", responseArray)
      const responseCount = data.filter(row => {
        if (!row.hasOwnProperty(responseKey)) {
          throw new Error(
              `You called makeProportions and passed response key ${responseKey}. But there is a row in your data that does not have ${responseKey} as a key.`
            );
        }
        return(responseArray.includes(row[responseKey]) && groupArray.includes(row[groupKey]))
      }).length
      console.log("response count is:", responseCount)
      groupMap.set(
        responseArray,
        responseCount / groupCount
      );
    });
    proportionsMap.set(groupArray, groupMap);
  });
  return proportionsMap;
}
