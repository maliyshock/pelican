import { BUILDING, CHARACTER, CREATURE, ENEMY, FERTILIZER, FOOD, OBJECT, PLAYER, REGION, RESOURCE, RESOURCE_DEPOSIT } from "~/constants/dictionary.ts";

export type Role =
  | typeof PLAYER
  | typeof CHARACTER
  | typeof ENEMY
  | typeof OBJECT
  | typeof BUILDING
  | typeof CREATURE
  | typeof REGION
  | typeof RESOURCE
  | typeof FOOD
  | typeof RESOURCE_DEPOSIT
  | typeof FERTILIZER;
