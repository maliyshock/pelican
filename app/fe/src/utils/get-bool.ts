import { getRandomNum } from "./get-random-num.ts";

export function getBool() {
  return !!getRandomNum(1);
}
