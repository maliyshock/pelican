import { Node } from "reactflow";
import {
  ATTACKING,
  BASIC,
  COMMON,
  CRAFTING,
  EXPLORING,
  FOREST,
  FOX,
  HARVESTING,
  LEGENDARY,
  PELICAN,
  POOP,
  RARE,
  REALLY_RARE,
  TALKING,
  UNIQUE,
} from "~/constants/dictionary.ts";
import { ReactNode } from "react";
import { DEEP_FOREST } from "~/constants/dictionary.ts";
import { ResourceDeposit } from "~/types/resource-deposit.ts";
import { Resource } from "~/types/resource.ts";
import { Role } from "~/types/role.ts";
import { Food } from "~/types/food.ts";

export type Action = typeof EXPLORING | typeof HARVESTING | typeof CRAFTING | typeof ATTACKING | typeof TALKING;

export type Rarity = typeof BASIC | typeof COMMON | typeof UNIQUE | typeof RARE | typeof REALLY_RARE | typeof LEGENDARY;
export type Region = typeof FOREST | typeof DEEP_FOREST;

export type Creature = typeof PELICAN | typeof FOX;
export type Fertilizer = typeof POOP;
export type EntityType = Region | ResourceDeposit | Resource | Role | Creature | Fertilizer | Food;

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
  img: {
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
