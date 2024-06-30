export const HERB = ["goose-grass"] as const;
export type HerbKind = (typeof HERB)[number];