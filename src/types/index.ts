import { Node } from "reactflow";
import {
  ATTACKING,
  BASIC,
  BERRIES_BUSH,
  BUILDING,
  CHARACTER,
  COMMON,
  CRAFTING,
  CREATURE,
  EMPTY_BERRIES_BUSH,
  ENEMY,
  EXPLORING,
  FERTILIZER,
  FOOD,
  FOREST,
  FOX,
  HARVESTING,
  LAKE,
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
  RIVER,
  STONE,
  STONE_DEPOSIT,
  TALKING,
  TREE,
  UNIQUE,
  WOOD,
} from "~/constants/dictionary.ts";
import { ReactNode } from "react";

export type Action = typeof EXPLORING | typeof HARVESTING | typeof CRAFTING | typeof ATTACKING | typeof TALKING;
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
export type Rarity = typeof BASIC | typeof COMMON | typeof UNIQUE | typeof RARE | typeof REALLY_RARE | typeof LEGENDARY;
export type Region = typeof FOREST;
export type ResourceDeposit = typeof TREE | typeof STONE_DEPOSIT | typeof BERRIES_BUSH | typeof EMPTY_BERRIES_BUSH | typeof LAKE | typeof RIVER | typeof CLAY_DEPOSIT;
export type Resource = typeof WOOD | typeof PLANK | typeof STONE | typeof TREE | typeof ANTHILL | typeof BONES | typeof CANE | typeof FEATHERS | typeof FLINT | typeof LEAFS | typeof ROPE | typeof Skin | typeof SOIL | typeof STICKS | typeof VINE;
export type Creature = typeof PELICAN | typeof FOX;
export type Fertilizer = typeof POOP;
export type EntityType = Region | ResourceDeposit | Resource | Role | Creature | Fertilizer;

type ReactFlowNode = Omit<Node, "data">;

export interface GameNode extends ReactFlowNode {
  data: GameNodeData;
}

export type Socket = {
  id: string;
  limit?: number;
  // type?: Resource; // type of material/resource in output (for machines)
};

export interface GameNodeData {
  roles: Role[];
  type: EntityType;
  price?: number;
  title?: string;
  root?: EntityType;
  img?: {
    src: string;
    alt: string;
  };
  inputs?: Socket[];
  outputs?: Socket[];
  dmg?: number;
  health?: number;
  quantity?: number;
  rarity?: Rarity;
  description?: ReactNode;
}
