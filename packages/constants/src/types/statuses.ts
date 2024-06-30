export const POSITIVE_STATUSES = ["health-regen"] as const;
export type PositiveStatusKind = (typeof POSITIVE_STATUSES)[number];

export const NEGATIVE_STATUSES = ["hunger", "poison", "bleed", "burn"] as const;
export type NegativeStatusKind = (typeof NEGATIVE_STATUSES)[number];

export type StatusKind = PositiveStatusKind | NegativeStatusKind;
