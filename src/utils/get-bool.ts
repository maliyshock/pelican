import { getRandom } from "~/utils/get-random.ts";

export function getBool() {
  return !!getRandom(1);
}
