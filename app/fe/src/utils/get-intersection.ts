export function getIntersection<T>(arr1: T[], arr2: T[]) {
  return arr1.filter(value => arr2.includes(value));
}
