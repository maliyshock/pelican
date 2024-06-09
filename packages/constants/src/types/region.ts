export const REGION = ["forest"] as const;
export type RegionKind = (typeof REGION)[number];