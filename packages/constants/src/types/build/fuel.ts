export const FUEL = ["stone-deposit", "cane", "feathers", "plank", "rope", "skin", "stick", "wood"] as const;
export type FuelKind = (typeof FUEL)[number];