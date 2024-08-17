export const ACTIONS = ["explore", "harvest", "talk", "fight", "craft", "eat", "burn", "watch"] as const;
export type ActionKind = (typeof ACTIONS)[number];
