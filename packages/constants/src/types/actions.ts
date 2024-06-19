export const ACTIONS = ["explore", "harvest", "talk", "fight", "craft", "eat"] as const;
export type ActionKind = (typeof ACTIONS)[number];
