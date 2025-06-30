import type { ProportionsMap } from "./types";


export function makeProportions(
  data: Array<{ [key: string]: string }>,
  responseKey: string,
  groupKey: string,
  groups: Array<Array<string>>,
  responses: Array<Array<string>>
): ProportionsMap {
  //check if the responseKey and groupKey are valid
  if (responseKey === undefined) {
    throw new Error(
      "You called makeProportions, but you did not specify a response key."
    );
  }
  if (groupKey === undefined) {
    throw new Error(
      "You called makeProportions, but you did not specify a group key"
    );
  }
  const proportionsMap = new Map();
  groups.forEach(groupArray => {
    const groupMap = new Map();
    const groupCount = data.filter(row => {
      if (!row.hasOwnProperty(groupKey)) {
        throw new Error(
          `You called makeProportions and passed group key ${groupKey}. But there is a row in your data that does not have ${groupKey} as a key.`
        );
      }
      return groupArray.includes(row[groupKey]);
    }).length;
    responses.forEach(responseArray => {
      groupMap.set(
        responseArray,
        data.filter(row => {
          if (!row.hasOwnProperty(responseKey)) {
            throw new Error(
              `You called makeProportions and passed response key ${responseKey}. But there is a row in your data that does not have ${responseKey} as a key.`
            );
          }
          return (
            responseArray.includes(row[responseKey]) &&
            groupArray.includes(row[groupKey])
          );
        }).length / groupCount
      );
    });
    proportionsMap.set(groupArray, groupMap);
  });
  return proportionsMap;
}
