export const ACTIONS = ["explore", "harvest", "talk", "fight", "craft"] as const;
export type ActionKind = (typeof ACTIONS)[number];
