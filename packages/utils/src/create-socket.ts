import generateID from "~/generate-id";
import { SocketTypeKind } from "@pelican/constants";

export default function createSocket(limit: number, type?: SocketTypeKind) {
  return { id: generateID(), type: type, ...(limit ? { limit } : {}) };
}
