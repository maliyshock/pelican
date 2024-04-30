import { Node } from "reactflow";
import {
  BASIC,
  BUILDING,
  CHARACTER,
  COMMON,
  CREATURE,
  ENEMY,
  FOOD,
  FOREST,
  FOX,
  LEGENDARY,
  OBJECT,
  PELICAN,
  PLANK,
  PLAYER,
  POOP,
  RARE,
  REALLY_RARE,
  REGION,
  RESOURCE,
  RESOURCE_DEPOSIT,
  STONE,
  STONE_DEPOSIT,
  TREE,
  UNIQUE,
  WOOD,
} from "~/constants/dictionary.ts";

export type Action = "collect" | "explore" | "harvest" | "eat" | "attack" | "talk" | "combine";
export type ObjectType =
  | typeof PLAYER
  | typeof CHARACTER
  | typeof ENEMY
  | typeof OBJECT
  | typeof BUILDING
  | typeof CREATURE
  | typeof REGION
  | typeof RESOURCE
  | typeof FOOD
  | typeof RESOURCE_DEPOSIT;
export type Rarity = typeof BASIC | typeof COMMON | typeof UNIQUE | typeof RARE | typeof REALLY_RARE | typeof LEGENDARY;
export type Region = typeof FOREST;
export type ResourceDeposit = typeof TREE | typeof STONE_DEPOSIT;
export type Resource = typeof WOOD | typeof PLANK | typeof STONE | typeof POOP;
export type Creature = typeof PELICAN | typeof FOX;
export type ObjectKeyName = Region | ResourceDeposit | Resource | ObjectType | Creature;

type ReactFlowNode = Omit<Node, "data">;

export interface GameNode extends ReactFlowNode {
  data: GameObject;
}

type Socket = {
  id: string;
  name: string;
  type: "input" | "output";
};

export type GameObject = {
  objectType: ObjectType[];
  objectKeyName: ObjectKeyName;
  price?: number;
  name?: string;
  img?: {
    src: string;
    alt: string;
  };
  root?: ObjectKeyName;
  inputs?: Socket[];
  outputs?: Socket[];
  dmg?: number;
  health?: number;
  quantity?: number;
  rarity?: Rarity;
};
