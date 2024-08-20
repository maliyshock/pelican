import { Socket } from "@pelican/constants";

export default function createSocket({ id, limit, type }: Socket): Socket {
  return { id, limit, type };
}
