// export function probabilityNormalisation(probabilityChances: Probability) {
//   const keys = Object.keys(probabilityChances) as Array<keyof Probability>;
//   const normalizationFactor = keys.reduce((acc, item) => acc + probabilityChances[item], 0);
//
//   return keys.reduce<Probability>((acc, item) => {
//     acc[item] = probabilityChances[item] * normalizationFactor;
//
//     return acc;
//   }, {} as Probability);
// }
