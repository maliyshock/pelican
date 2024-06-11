export const FERTILIZER = ["poop"] as const;
export type FertilizerKind = (typeof FERTILIZER)[number];