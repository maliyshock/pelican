import { getRandom } from "~/utils/getRandom.ts";

export function getBool() {
  return !!getRandom(1);
}
