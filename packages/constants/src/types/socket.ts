import { SocketTypeKind } from "~/types/socket-type";

export type Socket = {
  id: string;
  limit?: number;
  type?: SocketTypeKind; // type of material/resource in output (for machines)
};
