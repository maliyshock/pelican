import { getRandom } from "./get-random.ts";

export function getBool() {
  return !!getRandom(1);
}
