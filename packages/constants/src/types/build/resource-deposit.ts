export const RESOURCE_DEPOSIT = ["berries-bush", "clay-deposit", "lake", "river", "stone-deposit", "tree"] as const;
export type ResourceDepositKind = (typeof RESOURCE_DEPOSIT)[number];