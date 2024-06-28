export const ROLES = [
  "player",
  "character",
  "enemy",
  "building",
  "creature",
  "region",
  "resource",
  "food",
  "ingredient",
  "resource-deposit",
  "fertilizer",
  "merchant",
  "fuel",
  "fire-source",
] as const;
export type RoleKind = (typeof ROLES)[number];
