//TODO: add type of output or input source
import { Socket } from "~/types";
import { getRandom } from "~/utils/get-random.ts";

export function createSocket(limit?: number): Socket {
  return { id: `${getRandom(Date.now())}`, ...(limit ? { limit } : {}) };
}
