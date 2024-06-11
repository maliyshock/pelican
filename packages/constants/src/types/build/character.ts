export const CHARACTER = ["fox", "pelican"] as const;
export type CharacterKind = (typeof CHARACTER)[number];