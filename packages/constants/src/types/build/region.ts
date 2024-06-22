export const REGION = ["forest", "glade"] as const;
export type RegionKind = (typeof REGION)[number];