export const BUILDING = ["stone-wall", "building"] as const;
export type BuildingKind = (typeof BUILDING)[number];