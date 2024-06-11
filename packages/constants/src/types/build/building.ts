export const BUILDING = ["building", "stone-wall"] as const;
export type BuildingKind = (typeof BUILDING)[number];