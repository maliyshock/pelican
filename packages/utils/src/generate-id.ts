import { getRandom } from "~/get-random";

export function generateID() {
  return getRandom(Date.now()).toString();
}
