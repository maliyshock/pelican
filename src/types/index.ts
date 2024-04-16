import { Node } from "reactflow";
import { BASIC, COMMON, FOREST, LEGENDARY, POOP, RARE, REALLY_RARE, ROCK, STONE, TREE, UNIQUE, WOOD } from "~/constants/dictionary.ts";

export type Action = "collect" | "explore" | "harvest" | "eat";
export type ObjectType = "player" | "character" | "object" | "creature" | "region" | "resource" | "food" | "resourceDeposit";

export type Rarity = typeof BASIC | typeof COMMON | typeof UNIQUE | typeof RARE | typeof REALLY_RARE | typeof LEGENDARY;
export type Region = typeof FOREST;
export type ResourceDeposit = typeof TREE | typeof ROCK;
export type Resource = typeof WOOD | typeof STONE | typeof POOP;
export type ObjectKeyName = Region | ResourceDeposit | Resource | ObjectType;

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
  name?: string;
  color?: string;
  img?: {
    src: string;
    alt: string;
  };
  objectType: ObjectType[];
  objectKeyName: ObjectKeyName;
  inputs?: Socket[];
  outputs?: Socket[];
  dmg?: number;
  health?: number;
  quantity?: number;
  grabbable?: boolean;
  rarity?: Rarity;
};
