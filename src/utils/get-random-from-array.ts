import { getRandom } from "~/utils/get-random.ts";

export function getRandomFromArray<T>(array: Array<T>) {
  const index = getRandom(array.length - 1);

  return array[index];
}
