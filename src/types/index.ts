import { Node } from "reactflow";
import {
  BASIC,
  COMMON,
  FOREST,
  FOX,
  LEGENDARY,
  PELICAN,
  PIECE_OF_STONE,
  PLANK,
  POOP,
  RARE,
  REALLY_RARE,
  STONE,
  TREE,
  UNIQUE,
  WOOD,
} from "~/constants/dictionary.ts";

export type Action = "collect" | "explore" | "harvest" | "eat" | "attack" | "talk" | "combine";
export type ObjectType = "player" | "character" | "enemy" | "object" | "building" | "creature" | "region" | "resource" | "food" | "resourceDeposit";

export type Rarity = typeof BASIC | typeof COMMON | typeof UNIQUE | typeof RARE | typeof REALLY_RARE | typeof LEGENDARY;
export type Region = typeof FOREST;
export type ResourceDeposit = typeof TREE | typeof STONE;
export type Resource = typeof WOOD | typeof PLANK | typeof STONE | typeof PIECE_OF_STONE | typeof POOP;
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
  grabbable?: boolean;
  name?: string;
  color?: string;
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
