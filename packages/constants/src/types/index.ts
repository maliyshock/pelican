import { Node } from "reactflow";
import { ATTACKING, CRAFTING, EXPLORING, FOREST, FOX, HARVESTING, PELICAN, POOP, TALKING } from "~/constants/dictionary";
import { DEEP_FOREST } from "~/constants/dictionary";
import { ResourceDeposit } from "./resource-deposit";
import { Resource } from "./resource";
import { Role } from "./role";
import { Food } from "./food";

export type Action = typeof EXPLORING | typeof HARVESTING | typeof CRAFTING | typeof ATTACKING | typeof TALKING;

// export type Rarity = typeof BASIC | typeof COMMON | typeof UNIQUE | typeof RARE | typeof REALLY_RARE | typeof LEGENDARY;
export type Region = typeof FOREST | typeof DEEP_FOREST;

export type Creature = typeof PELICAN | typeof FOX;
export type Fertilizer = typeof POOP;
export type EntityType = Region | ResourceDeposit | Resource | Role | Creature | Fertilizer | Food;

type ReactFlowNode = Omit<Node, "data">;

export interface GameNode extends ReactFlowNode {
  data: GameNodeData;
}

export type Socket = {
  // id: string;
  limit?: number;
  // type?: Resource; // type of material/resource in output (for machines)
};

export interface GameNodeData {
  roles: Role[];
  type: EntityType;
  price?: number;
  title?: string;
  root?: EntityType;
  inputs?: Socket[];
  outputs?: Socket[];
  dmg?: number;
  health?: number;
  quantity?: number;
  description?: string;
}
