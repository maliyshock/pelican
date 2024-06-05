//TODO: add type of output or input source
import { Socket } from "../../../common/src/types";
import { getRandom } from "./get-random.ts";

export function createSocket(limit?: number): Socket {
  return { ...(limit ? { limit } : {}) };
}
