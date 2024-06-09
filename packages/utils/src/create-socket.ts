import { generateID } from "~/generate-id";

export function createSocket(limit: number) {
  return { id: generateID(), ...(limit ? { limit } : {}) };
}
