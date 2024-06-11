import generateID from "~/generate-id";

export default function createSocket(limit: number) {
  return { id: generateID(), ...(limit ? { limit } : {}) };
}
