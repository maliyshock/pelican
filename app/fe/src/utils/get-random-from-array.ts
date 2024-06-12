import { getRandomNum } from "./get-random-num.ts";

export function getRandomFromArray<T>(array: Array<T>) {
  if (array.length > 0) {
    const index = getRandomNum(array.length - 1);

    return array[index];
  } else {
    console.log("there is a negative index");
  }
}
