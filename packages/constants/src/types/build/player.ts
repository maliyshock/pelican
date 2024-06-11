export const PLAYER = ["pelican"] as const;
export type PlayerKind = (typeof PLAYER)[number];