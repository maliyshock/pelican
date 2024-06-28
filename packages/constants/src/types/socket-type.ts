export const SOCKET_TYPES = ["fuel", "heat"] as const;
export type SocketTypeKind = (typeof SOCKET_TYPES)[number];
