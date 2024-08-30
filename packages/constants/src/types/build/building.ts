export const BUILDING = ["building"] as const;
export type BuildingKind = (typeof BUILDING)[number];