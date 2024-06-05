//TODO: add type of output or input source
import {Socket} from "~/types";


export function createSocket(limit?: number): Socket {
  return { ...(limit ? { limit } : {}) };
}
