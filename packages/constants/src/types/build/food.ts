export const FOOD = ["acorn", "apple", "berry", "egg", "fish", "grain", "honey", "insects", "larvae", "mushroom", "wild-grapes", "poop"] as const;
export type FoodKind = (typeof FOOD)[number];