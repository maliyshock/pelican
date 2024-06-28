export const FIRE_SOURCE = ["building"] as const;
export type FireSourceKind = (typeof FIRE_SOURCE)[number];